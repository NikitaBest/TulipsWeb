{
  "x-generator": "NSwag v14.2.0.0 (NJsonSchema v11.1.0.0 (Newtonsoft.Json v13.0.0.0))",
  "openapi": "3.0.0",
  "info": {
    "title": "Tulip AI API",
    "version": "v1"
  },
  "servers": [
    {
      "url": "https://tulip-backend.burtimaxbot.ru"
    }
  ],
  "paths": {
    "/user/update": {
      "put": {
        "tags": [
          "User"
        ],
        "summary": "Редактирование пользователя",
        "description": "",
        "operationId": "ApiEndpointsUserUpdateUserUpdateUserEntpoint",
        "requestBody": {
          "x-name": "UpdateUserRequest",
          "description": "",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ApplicationModelsUserUpdateUserRequest"
              }
            }
          },
          "required": true,
          "x-position": 1
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SharedContractsResultOfUserEntity"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          }
        },
        "security": [
          {
            "JWTBearerAuth": []
          },
          {
            "Bearer": []
          }
        ]
      }
    },
    "/user/get": {
      "post": {
        "tags": [
          "User"
        ],
        "summary": "Получение данных пользователя",
        "description": "",
        "operationId": "ApiEndpointsUserGetUserGetUserEndpoint",
        "requestBody": {
          "x-name": "GetUserRequest",
          "description": "",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ApplicationModelsUserGetUserRequest"
              }
            }
          },
          "required": true,
          "x-position": 1
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SharedContractsResultOfPagedListOfUserEntity"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          }
        },
        "security": [
          {
            "JWTBearerAuth": []
          },
          {
            "Bearer": []
          }
        ]
      }
    },
    "/user/me": {
      "get": {
        "tags": [
          "User"
        ],
        "summary": "Получение данных текущего пользователя",
        "description": "Возвращает данные пользователя на основе JWT токена",
        "operationId": "ApiEndpointsUserGetMeGetMeEndpoint",
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SharedContractsResultOfUserEntity"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          }
        },
        "security": [
          {
            "JWTBearerAuth": []
          },
          {
            "Bearer": []
          }
        ]
      }
    },
    "/chats": {
      "post": {
        "tags": [
          "Chats"
        ],
        "summary": "Создание чата",
        "description": "Создаем новый чат для пользователя",
        "operationId": "ApiEndpointsChatCreateChatEndpoint",
        "requestBody": {
          "x-name": "CreateChatRequest",
          "description": "",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ApiEndpointsChatCreateChatRequest"
              }
            }
          },
          "required": true,
          "x-position": 1
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SharedContractsResultOfCreateChatResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          }
        },
        "security": [
          {
            "JWTBearerAuth": []
          },
          {
            "Bearer": []
          }
        ]
      },
      "get": {
        "tags": [
          "Chats"
        ],
        "summary": "Получение списка чатов",
        "description": "Получаем список чатов текущего пользователя с пагинацией",
        "operationId": "ApiEndpointsChatGetChatsEndpoint",
        "parameters": [
          {
            "name": "pageNumber",
            "in": "query",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 1
            }
          },
          {
            "name": "pageSize",
            "in": "query",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 50
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SharedContractsResultOfPagedListOfChatEntity"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          }
        },
        "security": [
          {
            "JWTBearerAuth": []
          },
          {
            "Bearer": []
          }
        ]
      }
    },
    "/chats/{chatId}": {
      "get": {
        "tags": [
          "Chats"
        ],
        "summary": "Получение чата по ИД",
        "description": "Получаем конкретный чат по идентификатору",
        "operationId": "ApiEndpointsChatGetChatByIdEndpoint",
        "parameters": [
          {
            "name": "chatId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "guid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SharedContractsResultOfChatItemDto"
                }
              }
            }
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/chats/messages/{messageId}": {
      "get": {
        "tags": [
          "Chats"
        ],
        "summary": "Получение сообщения по ИД",
        "description": "Получаем конкретное сообщение по идентификатору",
        "operationId": "ApiEndpointsChatGetMessageByIdEndpoint",
        "parameters": [
          {
            "name": "messageId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "guid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SharedContractsResultOfMessageEntity"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          }
        },
        "security": [
          {
            "JWTBearerAuth": []
          },
          {
            "Bearer": []
          }
        ]
      }
    },
    "/chats/{chatId}/messages": {
      "get": {
        "tags": [
          "Chats"
        ],
        "summary": "Получение сообщения по ИД",
        "description": "Получаем конкретное сообщение по идентификатору",
        "operationId": "ApiEndpointsChatGetMessagesEndpoint",
        "parameters": [
          {
            "name": "chatId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "guid"
            }
          },
          {
            "name": "pageNumber",
            "in": "query",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 1
            }
          },
          {
            "name": "pageSize",
            "in": "query",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 50
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SharedContractsResultOfPagedListOfMessageEntity"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          }
        },
        "security": [
          {
            "JWTBearerAuth": []
          },
          {
            "Bearer": []
          }
        ]
      },
      "post": {
        "tags": [
          "Chats"
        ],
        "summary": "Отправка сообщения в чат",
        "description": "Отправляем текст и/или изображения в выбранный чат",
        "operationId": "ApiEndpointsChatSendMessageEndpoint",
        "parameters": [
          {
            "name": "chatId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "guid"
            }
          }
        ],
        "requestBody": {
          "x-name": "SendMessageRequest",
          "description": "",
          "content": {
            "multipart/form-data": {
              "schema": {
                "$ref": "#/components/schemas/ApiEndpointsChatSendMessageRequest"
              }
            }
          },
          "required": true,
          "x-position": 1
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SharedContractsResultOfSendMessageResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          }
        },
        "security": [
          {
            "JWTBearerAuth": []
          },
          {
            "Bearer": []
          }
        ]
      }
    },
    "/chats/messages/{messageId}/next": {
      "get": {
        "tags": [
          "Chats"
        ],
        "summary": "Получение сообщения и следующих",
        "description": "Получаем сообщение по идентификатору и заданное количество следующих сообщений",
        "operationId": "ApiEndpointsChatGetMessageWithNextEndpoint",
        "parameters": [
          {
            "name": "messageId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "guid"
            }
          },
          {
            "name": "take",
            "in": "query",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SharedContractsResultOfIReadOnlyListOfMessageEntity"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          }
        },
        "security": [
          {
            "JWTBearerAuth": []
          },
          {
            "Bearer": []
          }
        ]
      }
    },
    "/chats/jobs/{jobId}/replay": {
      "post": {
        "tags": [
          "Chats"
        ],
        "summary": "Повтор сбойной задачи",
        "description": "Повторно ставим в очередь задачу обработки сообщения после ошибки",
        "operationId": "ApiEndpointsChatReplayFailedJobEndpoint",
        "parameters": [
          {
            "name": "jobId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "guid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SharedContractsResultOfReplayFailedJobResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          }
        },
        "security": [
          {
            "JWTBearerAuth": []
          },
          {
            "Bearer": []
          }
        ]
      }
    },
    "/auth/refresh-token": {
      "post": {
        "tags": [
          "Auth"
        ],
        "summary": "Обновление JWT токена",
        "description": "Обновляет JWT токен на основе текущего аутентифицированного пользователя.",
        "operationId": "ApiEndpointsAuthenticationRefreshRefreshTokenEndpoint",
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApplicationModelsAuthLoginResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          }
        },
        "security": [
          {
            "JWTBearerAuth": []
          },
          {
            "Bearer": []
          }
        ]
      }
    },
    "/auth/login": {
      "post": {
        "tags": [
          "Auth"
        ],
        "summary": "Авторизация пользователя по ИД сессии",
        "description": "",
        "operationId": "ApiEndpointsAuthenticationLoginLoginEndpoint",
        "requestBody": {
          "x-name": "LoginRequest",
          "description": "",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ApplicationModelsAuthLoginRequest"
              }
            }
          },
          "required": true,
          "x-position": 1
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApplicationModelsAuthLoginResponse"
                }
              }
            }
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/app/stat-event": {
      "post": {
        "tags": [
          "App"
        ],
        "summary": "Сохранение события статистики",
        "description": "Сохраняет событие использования приложения для аналитики",
        "operationId": "ApiEndpointsAppSaveStatEventSaveStatEventEndpoint",
        "requestBody": {
          "x-name": "SaveStatEventRequest",
          "description": "",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ApiEndpointsAppSaveStatEventSaveStatEventRequest"
              }
            }
          },
          "required": true,
          "x-position": 1
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SharedContractsResultOfStatEventEntity"
                }
              }
            }
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/app/send-error": {
      "post": {
        "tags": [
          "App"
        ],
        "summary": "Отправка ошибки",
        "description": "Отправка ошибки",
        "operationId": "ApiEndpointsAppSaveStatEventSendErrorEndpoint",
        "requestBody": {
          "x-name": "SendErrorRequest",
          "description": "",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ApiEndpointsAppSaveStatEventSendErrorRequest"
              }
            }
          },
          "required": true,
          "x-position": 1
        },
        "responses": {
          "204": {
            "description": "No Content"
          },
          "401": {
            "description": "Unauthorized"
          }
        },
        "security": [
          {
            "JWTBearerAuth": []
          },
          {
            "Bearer": []
          }
        ]
      }
    },
    "/app/save-log": {
      "post": {
        "tags": [
          "App"
        ],
        "summary": "Сохранение лога фронтенда",
        "description": "Публичный метод. При передаче валидного Bearer-токена в запись добавляется UserId. LogSource всегда frontend.",
        "operationId": "ApiEndpointsAppSaveFrontendLogSaveFrontendLogEndpoint",
        "requestBody": {
          "x-name": "SaveFrontendLogRequest",
          "description": "",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ApiEndpointsAppSaveFrontendLogSaveFrontendLogRequest"
              }
            }
          },
          "required": true,
          "x-position": 1
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SharedContractsResultOfLogEntity"
                }
              }
            }
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/app/openrouter/texts": {
      "post": {
        "tags": [
          "App"
        ],
        "summary": "OpenRouter: обработка списка текстов",
        "description": "Тело запроса содержит массив строк; они передаются модели как отдельные фрагменты. В ответе — один текст от модели.",
        "operationId": "ApiEndpointsAppOpenRouterTextsOpenRouterTextsEndpoint",
        "requestBody": {
          "x-name": "OpenRouterTextsRequest",
          "description": "",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ApiEndpointsAppOpenRouterTextsOpenRouterTextsRequest"
              }
            }
          },
          "required": true,
          "x-position": 1
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiEndpointsAppOpenRouterTextsOpenRouterTextsResponse"
                }
              }
            }
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/app/health-check": {
      "post": {
        "tags": [
          "App"
        ],
        "summary": "Проверка состояния приложения",
        "description": "Если вернула 200, значит приложение в рабочем состоянии. Иначе - ошибка работы приложения или недоступность приложения",
        "operationId": "ApiEndpointsAppHealthCheckHealthCheckEndpoint",
        "requestBody": {
          "x-name": "HealthCheckRequest",
          "description": "",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ApiEndpointsAppHealthCheckHealthCheckRequest"
              }
            }
          },
          "required": true,
          "x-position": 1
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApiEndpointsAppHealthCheckHealthCheckResponse"
                }
              }
            }
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    }
  },
  "components": {
    "schemas": {
      "SharedContractsResultOfUserEntity": {
        "allOf": [
          {
            "$ref": "#/components/schemas/SharedContractsResult"
          },
          {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "value": {
                "nullable": true,
                "oneOf": [
                  {
                    "$ref": "#/components/schemas/InfrastructureDbAppEntitiesUserEntity"
                  }
                ]
              }
            }
          }
        ]
      },
      "InfrastructureDbAppEntitiesUserEntity": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "id": {
            "type": "string",
            "format": "guid"
          },
          "createdAt": {
            "type": "string",
            "format": "date-time"
          },
          "createdById": {
            "type": "string",
            "format": "guid",
            "nullable": true
          },
          "updatedAt": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "updatedById": {
            "type": "string",
            "format": "guid",
            "nullable": true
          },
          "deletedAt": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "deletedById": {
            "type": "string",
            "format": "guid",
            "nullable": true
          }
        }
      },
      "SharedContractsResult": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "isSuccess": {
            "type": "boolean"
          },
          "error": {
            "type": "string",
            "nullable": true
          }
        }
      },
      "ApplicationModelsUserUpdateUserRequest": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "note": {
            "type": "string",
            "nullable": true
          }
        }
      },
      "SharedContractsResultOfPagedListOfUserEntity": {
        "allOf": [
          {
            "$ref": "#/components/schemas/SharedContractsResult"
          },
          {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "value": {
                "nullable": true,
                "oneOf": [
                  {
                    "$ref": "#/components/schemas/InfrastructureModelsPagedListOfUserEntity"
                  }
                ]
              }
            }
          }
        ]
      },
      "InfrastructureModelsPagedListOfUserEntity": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "currentPage": {
            "type": "integer",
            "format": "int32"
          },
          "totalPages": {
            "type": "integer",
            "format": "int32"
          },
          "pageSize": {
            "type": "integer",
            "format": "int32"
          },
          "totalCount": {
            "type": "integer",
            "format": "int32"
          },
          "hasPrevious": {
            "type": "boolean"
          },
          "hasNext": {
            "type": "boolean"
          },
          "data": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/InfrastructureDbAppEntitiesUserEntity"
            }
          }
        }
      },
      "ApplicationModelsUserGetUserRequest": {
        "allOf": [
          {
            "$ref": "#/components/schemas/SharedModelsPagination"
          },
          {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "ids": {
                "type": "array",
                "nullable": true,
                "items": {
                  "type": "string",
                  "format": "guid"
                }
              },
              "search": {
                "type": "string",
                "nullable": true
              },
              "order": {
                "type": "string",
                "nullable": true
              }
            }
          }
        ]
      },
      "SharedModelsPagination": {
        "type": "object",
        "x-abstract": true,
        "additionalProperties": false
      },
      "SharedContractsResultOfCreateChatResponse": {
        "allOf": [
          {
            "$ref": "#/components/schemas/SharedContractsResult"
          },
          {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "value": {
                "nullable": true,
                "oneOf": [
                  {
                    "$ref": "#/components/schemas/ApiEndpointsChatCreateChatResponse"
                  }
                ]
              }
            }
          }
        ]
      },
      "ApiEndpointsChatCreateChatResponse": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "chatId": {
            "type": "string",
            "format": "guid"
          },
          "status": {
            "type": "string"
          },
          "createdAt": {
            "type": "string",
            "format": "date-time"
          }
        }
      },
      "ApiEndpointsChatCreateChatRequest": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "title": {
            "type": "string",
            "nullable": true
          }
        }
      },
      "SharedContractsResultOfChatItemDto": {
        "allOf": [
          {
            "$ref": "#/components/schemas/SharedContractsResult"
          },
          {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "value": {
                "nullable": true,
                "oneOf": [
                  {
                    "$ref": "#/components/schemas/ApiEndpointsChatChatItemDto"
                  }
                ]
              }
            }
          }
        ]
      },
      "ApiEndpointsChatChatItemDto": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "chatId": {
            "type": "string",
            "format": "guid"
          },
          "userId": {
            "type": "string",
            "format": "guid"
          },
          "title": {
            "type": "string",
            "nullable": true
          },
          "status": {
            "type": "string"
          },
          "createdAt": {
            "type": "string",
            "format": "date-time"
          },
          "updatedAt": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "lastMessageAt": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "isProcessing": {
            "type": "boolean"
          }
        }
      },
      "ApiEndpointsChatGetChatByIdRequest": {
        "type": "object",
        "additionalProperties": false
      },
      "SharedContractsResultOfPagedListOfChatEntity": {
        "allOf": [
          {
            "$ref": "#/components/schemas/SharedContractsResult"
          },
          {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "value": {
                "nullable": true,
                "oneOf": [
                  {
                    "$ref": "#/components/schemas/InfrastructureModelsPagedListOfChatEntity"
                  }
                ]
              }
            }
          }
        ]
      },
      "InfrastructureModelsPagedListOfChatEntity": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "currentPage": {
            "type": "integer",
            "format": "int32"
          },
          "totalPages": {
            "type": "integer",
            "format": "int32"
          },
          "pageSize": {
            "type": "integer",
            "format": "int32"
          },
          "totalCount": {
            "type": "integer",
            "format": "int32"
          },
          "hasPrevious": {
            "type": "boolean"
          },
          "hasNext": {
            "type": "boolean"
          },
          "data": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/InfrastructureDbAppEntitiesChatEntity"
            }
          }
        }
      },
      "InfrastructureDbAppEntitiesChatEntity": {
        "allOf": [
          {
            "$ref": "#/components/schemas/InfrastructureDbBaseEntity"
          },
          {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "userId": {
                "type": "string",
                "format": "guid"
              },
              "user": {
                "$ref": "#/components/schemas/InfrastructureDbAppEntitiesUserEntity"
              },
              "title": {
                "type": "string",
                "nullable": true
              },
              "status": {
                "$ref": "#/components/schemas/InfrastructureDbAppEntitiesChatStatus"
              },
              "lastMessageAt": {
                "type": "string",
                "format": "date-time",
                "nullable": true
              },
              "messages": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/InfrastructureDbAppEntitiesMessageEntity"
                }
              },
              "processingJobs": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/InfrastructureDbAppEntitiesProcessingJobEntity"
                }
              }
            }
          }
        ]
      },
      "InfrastructureDbAppEntitiesChatStatus": {
        "type": "integer",
        "description": "",
        "x-enumNames": [
          "Idle",
          "Processing",
          "Error"
        ],
        "enum": [
          0,
          1,
          2
        ]
      },
      "InfrastructureDbAppEntitiesMessageEntity": {
        "allOf": [
          {
            "$ref": "#/components/schemas/InfrastructureDbBaseEntity"
          },
          {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "chatId": {
                "type": "string",
                "format": "guid"
              },
              "role": {
                "$ref": "#/components/schemas/InfrastructureDbAppEntitiesMessageRole"
              },
              "textHtml": {
                "type": "string",
                "nullable": true
              },
              "status": {
                "$ref": "#/components/schemas/InfrastructureDbAppEntitiesMessageStatus"
              },
              "failureCode": {
                "type": "string",
                "nullable": true
              },
              "failureReason": {
                "type": "string",
                "nullable": true
              },
              "retryCount": {
                "type": "integer",
                "format": "int32"
              },
              "clientRequestId": {
                "type": "string",
                "nullable": true
              },
              "images": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/InfrastructureDbAppEntitiesMessageImageEntity"
                }
              },
              "processingJobs": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/InfrastructureDbAppEntitiesProcessingJobEntity"
                }
              }
            }
          }
        ]
      },
      "InfrastructureDbAppEntitiesMessageRole": {
        "type": "integer",
        "description": "",
        "x-enumNames": [
          "User",
          "Assistant",
          "System"
        ],
        "enum": [
          0,
          1,
          2
        ]
      },
      "InfrastructureDbAppEntitiesMessageStatus": {
        "type": "integer",
        "description": "",
        "x-enumNames": [
          "Queued",
          "Processing",
          "Completed",
          "Failed"
        ],
        "enum": [
          0,
          1,
          2,
          3
        ]
      },
      "InfrastructureDbAppEntitiesMessageImageEntity": {
        "allOf": [
          {
            "$ref": "#/components/schemas/InfrastructureDbBaseEntity"
          },
          {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "messageId": {
                "type": "string",
                "format": "guid"
              },
              "storageUrl": {
                "type": "string"
              },
              "mimeType": {
                "type": "string"
              },
              "sizeBytes": {
                "type": "integer",
                "format": "int64"
              },
              "width": {
                "type": "integer",
                "format": "int32",
                "nullable": true
              },
              "height": {
                "type": "integer",
                "format": "int32",
                "nullable": true
              },
              "sortOrder": {
                "type": "integer",
                "format": "int32"
              }
            }
          }
        ]
      },
      "InfrastructureDbBaseEntity": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "id": {
            "type": "string",
            "format": "guid"
          },
          "createdAt": {
            "type": "string",
            "format": "date-time"
          }
        }
      },
      "InfrastructureDbAppEntitiesProcessingJobEntity": {
        "allOf": [
          {
            "$ref": "#/components/schemas/InfrastructureDbBaseEntity"
          },
          {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "chatId": {
                "type": "string",
                "format": "guid"
              },
              "chat": {
                "$ref": "#/components/schemas/InfrastructureDbAppEntitiesChatEntity"
              },
              "messageId": {
                "type": "string",
                "format": "guid"
              },
              "status": {
                "$ref": "#/components/schemas/InfrastructureDbAppEntitiesJobStatus"
              },
              "attempt": {
                "type": "integer",
                "format": "int32"
              },
              "maxAttempts": {
                "type": "integer",
                "format": "int32"
              },
              "lockedUntil": {
                "type": "string",
                "format": "date-time",
                "nullable": true
              },
              "lastError": {
                "type": "string",
                "nullable": true
              }
            }
          }
        ]
      },
      "InfrastructureDbAppEntitiesJobStatus": {
        "type": "integer",
        "description": "",
        "x-enumNames": [
          "Queued",
          "Processing",
          "Completed",
          "Failed"
        ],
        "enum": [
          0,
          1,
          2,
          3
        ]
      },
      "ApiEndpointsChatGetChatsRequest": {
        "allOf": [
          {
            "$ref": "#/components/schemas/SharedModelsPagination"
          },
          {
            "type": "object",
            "additionalProperties": false
          }
        ]
      },
      "SharedContractsResultOfMessageEntity": {
        "allOf": [
          {
            "$ref": "#/components/schemas/SharedContractsResult"
          },
          {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "value": {
                "nullable": true,
                "oneOf": [
                  {
                    "$ref": "#/components/schemas/InfrastructureDbAppEntitiesMessageEntity"
                  }
                ]
              }
            }
          }
        ]
      },
      "ApiEndpointsChatGetMessageByIdRequest": {
        "type": "object",
        "additionalProperties": false
      },
      "SharedContractsResultOfPagedListOfMessageEntity": {
        "allOf": [
          {
            "$ref": "#/components/schemas/SharedContractsResult"
          },
          {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "value": {
                "nullable": true,
                "oneOf": [
                  {
                    "$ref": "#/components/schemas/InfrastructureModelsPagedListOfMessageEntity"
                  }
                ]
              }
            }
          }
        ]
      },
      "InfrastructureModelsPagedListOfMessageEntity": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "currentPage": {
            "type": "integer",
            "format": "int32"
          },
          "totalPages": {
            "type": "integer",
            "format": "int32"
          },
          "pageSize": {
            "type": "integer",
            "format": "int32"
          },
          "totalCount": {
            "type": "integer",
            "format": "int32"
          },
          "hasPrevious": {
            "type": "boolean"
          },
          "hasNext": {
            "type": "boolean"
          },
          "data": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/InfrastructureDbAppEntitiesMessageEntity"
            }
          }
        }
      },
      "ApiEndpointsChatGetMessagesRequest": {
        "allOf": [
          {
            "$ref": "#/components/schemas/SharedModelsPagination"
          },
          {
            "type": "object",
            "additionalProperties": false
          }
        ]
      },
      "SharedContractsResultOfIReadOnlyListOfMessageEntity": {
        "allOf": [
          {
            "$ref": "#/components/schemas/SharedContractsResult"
          },
          {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "value": {
                "type": "array",
                "nullable": true,
                "items": {
                  "$ref": "#/components/schemas/InfrastructureDbAppEntitiesMessageEntity"
                }
              }
            }
          }
        ]
      },
      "ApiEndpointsChatGetMessageWithNextRequest": {
        "type": "object",
        "additionalProperties": false
      },
      "SharedContractsResultOfReplayFailedJobResponse": {
        "allOf": [
          {
            "$ref": "#/components/schemas/SharedContractsResult"
          },
          {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "value": {
                "nullable": true,
                "oneOf": [
                  {
                    "$ref": "#/components/schemas/ApiEndpointsChatReplayFailedJobResponse"
                  }
                ]
              }
            }
          }
        ]
      },
      "ApiEndpointsChatReplayFailedJobResponse": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "jobId": {
            "type": "string",
            "format": "guid"
          },
          "status": {
            "type": "string"
          }
        }
      },
      "ApiEndpointsChatReplayFailedJobRequest": {
        "type": "object",
        "additionalProperties": false
      },
      "SharedContractsResultOfSendMessageResponse": {
        "allOf": [
          {
            "$ref": "#/components/schemas/SharedContractsResult"
          },
          {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "value": {
                "nullable": true,
                "oneOf": [
                  {
                    "$ref": "#/components/schemas/ApiEndpointsChatSendMessageResponse"
                  }
                ]
              }
            }
          }
        ]
      },
      "ApiEndpointsChatSendMessageResponse": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "messageId": {
            "type": "string",
            "format": "guid"
          },
          "status": {
            "type": "string"
          },
          "createdAt": {
            "type": "string",
            "format": "date-time"
          }
        }
      },
      "ApiEndpointsChatSendMessageRequest": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "textHtml": {
            "type": "string",
            "nullable": true
          },
          "images": {
            "type": "array",
            "items": {
              "type": "string",
              "format": "binary"
            }
          },
          "clientRequestId": {
            "type": "string",
            "nullable": true
          }
        }
      },
      "ApplicationModelsAuthLoginResponse": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "user": {
            "$ref": "#/components/schemas/InfrastructureDbAppEntitiesUserEntity"
          },
          "token": {
            "type": "string"
          }
        }
      },
      "ApplicationModelsAuthLoginRequest": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "id": {
            "type": "string",
            "format": "guid",
            "nullable": true
          },
          "utm": {
            "type": "string",
            "nullable": true
          }
        }
      },
      "SharedContractsResultOfStatEventEntity": {
        "allOf": [
          {
            "$ref": "#/components/schemas/SharedContractsResult"
          },
          {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "value": {
                "nullable": true,
                "oneOf": [
                  {
                    "$ref": "#/components/schemas/InfrastructureDbAppEntitiesStatEventEntity"
                  }
                ]
              }
            }
          }
        ]
      },
      "InfrastructureDbAppEntitiesStatEventEntity": {
        "allOf": [
          {
            "$ref": "#/components/schemas/InfrastructureDbBaseEntity"
          },
          {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "userId": {
                "type": "string",
                "format": "guid",
                "nullable": true
              },
              "user": {
                "nullable": true,
                "oneOf": [
                  {
                    "$ref": "#/components/schemas/InfrastructureDbAppEntitiesUserEntity"
                  }
                ]
              },
              "sessionId": {
                "type": "integer",
                "format": "int64",
                "nullable": true
              },
              "type": {
                "type": "string",
                "nullable": true
              },
              "data": {
                "type": "string",
                "nullable": true
              },
              "durationSeconds": {
                "type": "number",
                "format": "double",
                "nullable": true
              }
            }
          }
        ]
      },
      "ApiEndpointsAppSaveStatEventSaveStatEventRequest": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "type": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "type": "string",
            "nullable": true
          },
          "durationSeconds": {
            "type": "number",
            "format": "double",
            "nullable": true
          }
        }
      },
      "ApiEndpointsAppSaveStatEventSendErrorRequest": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "errorMessage": {
            "type": "string",
            "nullable": true
          },
          "data": {
            "type": "string",
            "nullable": true
          },
          "stackTrace": {
            "type": "string",
            "nullable": true
          }
        }
      },
      "SharedContractsResultOfLogEntity": {
        "allOf": [
          {
            "$ref": "#/components/schemas/SharedContractsResult"
          },
          {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "value": {
                "nullable": true,
                "oneOf": [
                  {
                    "$ref": "#/components/schemas/InfrastructureDbAppEntitiesLogEntity"
                  }
                ]
              }
            }
          }
        ]
      },
      "InfrastructureDbAppEntitiesLogEntity": {
        "allOf": [
          {
            "$ref": "#/components/schemas/InfrastructureDbBaseEntity"
          },
          {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "userId": {
                "type": "string",
                "format": "guid",
                "nullable": true
              },
              "user": {
                "nullable": true,
                "oneOf": [
                  {
                    "$ref": "#/components/schemas/InfrastructureDbAppEntitiesUserEntity"
                  }
                ]
              },
              "logSource": {
                "nullable": true,
                "oneOf": [
                  {
                    "$ref": "#/components/schemas/InfrastructureDbAppEntitiesLogSource"
                  }
                ]
              },
              "logType": {
                "type": "string",
                "nullable": true
              },
              "log": {
                "type": "string",
                "nullable": true
              },
              "logMessage": {
                "type": "string",
                "nullable": true
              }
            }
          }
        ]
      },
      "InfrastructureDbAppEntitiesLogSource": {
        "type": "integer",
        "description": "",
        "x-enumNames": [
          "Backend",
          "Frontend"
        ],
        "enum": [
          0,
          1
        ]
      },
      "ApiEndpointsAppSaveFrontendLogSaveFrontendLogRequest": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "logType": {
            "type": "string",
            "nullable": true
          },
          "log": {
            "default": "{}"
          },
          "logMessage": {
            "type": "string",
            "nullable": true
          }
        }
      },
      "ApiEndpointsAppOpenRouterTextsOpenRouterTextsResponse": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "text": {
            "type": "string"
          },
          "error": {
            "type": "string",
            "nullable": true
          }
        }
      },
      "ApiEndpointsAppOpenRouterTextsOpenRouterTextsRequest": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "texts": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "systemPrompt": {
            "type": "string",
            "default": "Ты ИИ помощник",
            "nullable": true
          },
          "model": {
            "type": "string",
            "default": "google/gemini-2.5-flash",
            "nullable": true
          }
        }
      },
      "ApiEndpointsAppHealthCheckHealthCheckResponse": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "result": {
            "type": "string"
          }
        }
      },
      "ApiEndpointsAppHealthCheckHealthCheckRequest": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "mockMessage": {
            "type": "string",
            "nullable": true
          }
        }
      }
    },
    "securitySchemes": {
      "JWTBearerAuth": {
        "type": "http",
        "description": "Enter a JWT token to authorize the requests...",
        "scheme": "Bearer",
        "bearerFormat": "JWT"
      }
    }
  }
}