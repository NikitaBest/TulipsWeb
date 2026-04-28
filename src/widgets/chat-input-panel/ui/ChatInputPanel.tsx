import type { ChangeEvent, FormEvent } from "react";
import { useRef, useState } from "react";
import styles from "./ChatInputPanel.module.css";

const MAX_TEXTAREA_HEIGHT = 220;

type PendingImage = {
  id: string;
  file: File;
};

type ChatInputPanelProps = {
  onSubmit?: (payload: { text: string; images: File[] }) => Promise<void> | void;
  disabled?: boolean;
  isSending?: boolean;
  hint?: string;
};

export const ChatInputPanel = ({ onSubmit, disabled = false, isSending = false, hint }: ChatInputPanelProps) => {
  const [pendingImages, setPendingImages] = useState<PendingImage[]>([]);
  const [text, setText] = useState("");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleInput = (event: FormEvent<HTMLTextAreaElement>) => {
    const element = event.currentTarget;
    element.style.height = "auto";

    const nextHeight = Math.min(element.scrollHeight, MAX_TEXTAREA_HEIGHT);
    element.style.height = `${nextHeight}px`;
    element.style.overflowY = element.scrollHeight > MAX_TEXTAREA_HEIGHT ? "auto" : "hidden";
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      return;
    }

    const selectedFiles = Array.from(files);
    const isHeicFile = (file: File) => {
      const mime = file.type.toLowerCase();
      const name = file.name.toLowerCase();
      return mime === "image/heic" || mime === "image/heif" || name.endsWith(".heic") || name.endsWith(".heif");
    };

    const supportedFiles = selectedFiles.filter((file) => !isHeicFile(file));
    const hasUnsupportedHeic = supportedFiles.length !== selectedFiles.length;

    if (hasUnsupportedHeic) {
      setUploadError("Формат HEIC/HEIF пока не поддерживается. Пожалуйста, сохраните фото как JPG или PNG.");
    } else {
      setUploadError(null);
    }

    const newItems = supportedFiles.map((file) => ({
      id: `${file.name}-${file.lastModified}`,
      file,
    }));
    setPendingImages((prev) => [...prev, ...newItems]);
    event.target.value = "";
  };

  const removePendingImage = (id: string) => {
    setPendingImages((prev) => prev.filter((item) => item.id !== id));
  };

  const formatFileSize = (size: number) => {
    const kb = size / 1024;
    if (kb < 1024) {
      return `${kb.toFixed(1)} KB`;
    }

    const mb = kb / 1024;
    return `${mb.toFixed(2)} MB`;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!onSubmit || disabled) {
      return;
    }

    const trimmed = text.trim();
    const images = pendingImages.map((item) => item.file);
    if (!trimmed && images.length === 0) {
      return;
    }

    await onSubmit({ text: trimmed, images });
    setText("");
    setPendingImages([]);
    setUploadError(null);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.panel}>
        <input
          ref={fileInputRef}
          className={styles.hiddenInput}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />

        {pendingImages.length > 0 ? (
          <div className={styles.attachments}>
            {pendingImages.map((item) => (
              <article key={item.id} className={styles.attachmentCard}>
                <div className={styles.attachmentIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" className={styles.attachmentIconSvg}>
                    <rect
                      x="3.5"
                      y="4"
                      width="17"
                      height="16"
                      rx="3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                    <circle cx="9" cy="9" r="1.4" fill="currentColor" />
                    <path
                      d="M6.7 16.3 10 12.9a1 1 0 0 1 1.42 0l1.35 1.4 1.95-2.1a1 1 0 0 1 1.49.02l1.54 1.77"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className={styles.attachmentMeta}>
                  <p className={styles.attachmentName}>{item.file.name}</p>
                  <p className={styles.attachmentSize}>{formatFileSize(item.file.size)}</p>
                </div>
                <button
                  type="button"
                  className={styles.removeAttachment}
                  onClick={() => removePendingImage(item.id)}
                  aria-label={`Удалить ${item.file.name}`}
                >
                  ✕
                </button>
              </article>
            ))}
          </div>
        ) : null}

        <textarea
          className={styles.input}
          placeholder={disabled ? "Ассистент готовит ответ..." : "Начните вводить вопрос..."}
          rows={1}
          onInput={handleInput}
          value={text}
          onChange={(event) => setText(event.target.value)}
          disabled={disabled || isSending}
        />
        {hint ? <p className={styles.hint}>{hint}</p> : null}
        {uploadError ? <p className={styles.errorHint}>{uploadError}</p> : null}
      <div className={styles.footer}>
        <button
          type="button"
          className={styles.iconButton}
          aria-label="Прикрепить фото"
          onClick={handleAttachClick}
          disabled={disabled || isSending}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
            <path
              d="M4.75 7.25a2.5 2.5 0 0 1 2.5-2.5h9.5a2.5 2.5 0 0 1 2.5 2.5v9.5a2.5 2.5 0 0 1-2.5 2.5h-9.5a2.5 2.5 0 0 1-2.5-2.5z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <circle cx="9" cy="9" r="1.4" fill="currentColor" />
            <path
              d="m7.4 16 3.05-3.2a1 1 0 0 1 1.42 0L13 14l1.5-1.65a1 1 0 0 1 1.48-.03L18.2 15"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="submit"
          className={styles.iconButton}
          aria-label="Отправить сообщение"
          disabled={disabled || isSending || (!text.trim() && pendingImages.length === 0)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
            <path
              d="M12 18V7.2M7.8 11.4 12 7l4.2 4.4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
    </form>
  );
};
