# Ecommerce API

This document provides an overview of the Ecommerce API, a versatile Authentication system and Data storage and retrieval system products oriented.<br/>The API supports multiple versions, with distinct features and underlying storage mechanisms.

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/12499063-3c7a1402-da37-4c98-af2c-be75203428f1?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D12499063-3c7a1402-da37-4c98-af2c-be75203428f1%26entityType%3Dcollection%26workspaceId%3Df672ac74-db37-4a32-9f67-76f04a48cac1)

## Versions

### v1

The v1 version of the API use a local storage system, saving data directly to the server's static file system.<br/>
Files are stored in the directory specified in `api.config.js`in the `documentsFolder` field.<br/>
This version is suitable for scenarios where a simple local storage solution is sufficient.

### v2
The v2 version of the API employs the Firebase storage system, allowing for cloud-based data storage.<br/>
This version is well-suited for applications that require scalable and reliable cloud storage.
You need to provide the Firebase service account key in the `firebaseServiceAccountKey` field in `api.config.js` and create a collection in the Firebase database with the name specified in the `collectionName` field.

### vX

Feel free to create and add to this repository your own version with different providers and storage systems.<br/>
You can create a new version by duplicating the `v2` folder and modifying the code to suit your specific use case.

## Firebase Authentication Middleware

> The authentication system is a middleware that can be used to update user details and manage access to restricted areas.

First, you need to create a collection in the Firebase database with the name specified in the `firestoreCollection` field in `api.config.js`.<br/><br/>
Then, you have to enable the authentication system by setting the `enabled` field in `api.config.js` to `true` and go to the firebase console and enable the email/password authentication method.<br/><br/>
Finally, you need to set the `accessCodeKey` field in `api.config.js` to a secret key that will be used to authenticate the admin user.

### /auth/checkAdminAccessCode

Checks if the specified access code is valid compared to the access code stored in api.config.js.

- **HTTP Method**: GET
- **Parameters**:
    - `key`: The access code to be checked.

- **Response**:
- 200 OK: Returns a success message if the access code is valid.
- 200 OK: Returns a failure message if the access code is invalid.

### /auth/getUserDetails/:id

Gets the details of the user with the specified ID.

- **HTTP Method**: GET
- **Parameters**:
    - `id`: The unique identifier of the user.

- **Response**:
- 200 OK: Returns the details of the user in JSON format.

### /auth/setUserDetails/:id

Sets the details of the user with the specified ID.

- **HTTP Method**: POST
- **Parameters**:
    - `id`: The unique identifier of the user.
- **Request Body**:
    - All the fields of the user
- **Response**:
- 200 OK: Returns a success message and the updated user details in JSON format.
- 500 Internal Server Error: If an error occurs during the update process.

## Configuration

In the `api.config.js` file, you can specify the configuration for your API:

```javascript
const apiConfiguration = {
  baseUrl: 'http://localhost',
  port: 3000,
  apiVersion: 'v1',
  documentsFolder: 'static/documents',
  firebaseServiceAccountKey: undefined,
  collectionName: 'products',
  authentication: {
    accessCodeKey: 'YOURSECRETKEY',
    enabled: true,
    firestoreCollection: 'users',
  }
}

module.exports = apiConfiguration;
```

- `baseUrl`: The base URL of the API.
- `port`: The port number for the API server.
- `apiVersion`: Specifies the API version to use ('v1' or 'v2').
- `documentsFolder`: The folder path for storing documents in the Static Storage System.
- `firebaseServiceAccountKey`: The Firebase service account key for API version 2.
- `collectionName`: The name of the main collection (Should be the same as the collection name in the Firebase database).
- `authentication`: The authentication system configuration.
    - `accessCodeKey`: The access code for the admin user.
    - `enabled`: Specifies whether the authentication system is enabled or not.
    - `firestoreCollection`: The name of the collection in the Firebase database for storing user details.

## Products collections API Routes

> `{version}`: The API version ('v1' or 'v2').

### /{version}/create
- **HTTP Method**: POST
- **Request Body**:
    - `title`: Title of the document.
    - `description`: Description of the document.
    - `price`: Price of the document.
    - `images`: Images associated with the document.
    - `collection`: Collection of the document.
- **Response**:
    - 201 Created: Returns the newly created document in JSON format.
    - 400 Bad Request: If required parameters are missing in the request body.
    - 500 Internal Server Error: If an error occurs during the creation process.

### /{version}/getAll

- **HTTP Method**: GET
- **Parameters**:
    - `{version}`: The API version ('v1' or 'v2').
- **Response**:
    - 200 OK: Returns an array of all documents in JSON format.
    - 500 Internal Server Error: If an error occurs during the retrieval process.

### /{version}/details/:id

- **HTTP Method**: GET
- **Parameters**:
    - `{version}`: The API version ('v1' or 'v2').
    - `:id`: The unique identifier of the document.
- **Response**:
    - 200 OK: Returns the details of the document in JSON format.
    - 404 Not Found: If the document with the specified ID is not found.
    - 500 Internal Server Error: If an error occurs during the retrieval process.

### /{version}/edit/:id

- **HTTP Method**: POST
- **Parameters**:
    - `{version}`: The API version ('v1' or 'v2').
    - `:id`: The unique identifier of the document.
- **Request Body**:
    - Specify the fields to be updated in the document.
- **Response**:
    - 200 OK: Returns a success message and the updated document in JSON format.
    - 404 Not Found: If the document with the specified ID is not found.
    - 500 Internal Server Error: If an error occurs during the update process.

### /{version}/delete/:id

- **HTTP Method**: DELETE
- **Parameters**:
    - `{version}`: The API version ('v1' or 'v2').
    - `:id`: The unique identifier of the document.
- **Response**:
    - 200 OK: Returns a success message if the document is deleted.
    - 404 Not Found: If the document with the specified ID is not found.
    - 500 Internal Server Error: If an error occurs during the deletion process.

These routes provide various functionalities for managing documents based on the specified API version. Make sure to use the correct version in the URL to access the desired functionality.

## Getting Started

1. Install dependencies: `npm install`
2. Start the server: `npm start`

Make sure to set the `apiVersion` in `api.config.js` to the desired version ('v1' or 'v2') to let the API know which version to use.

Feel free to explore other routes and functionalities of the API based on your specific use case.

For more details, refer to the source code and comments in the provided files.
