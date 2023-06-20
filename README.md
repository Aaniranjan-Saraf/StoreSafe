# SERVRE
Are you tired of the hassle of emailing files from your phone to your desktop? Say goodbye to that inconvenience because SERVRE is here to solve your problem!
Using this simple web application, users can upload files to a remote server(on a local machine) and then download these files from the internet on any device or edit the list of your uploaded files just by using the SERVRE web-app.

## Technologies Employed

- **React**: A JavaScript library used to create user interfaces.
- **Express**: Node.js web application framework.
- **Multer:** Node.js middleware for processing file uploads.
- **Axios**: Promise-based HTTP client for making browser or Node.js queries.
- **React** Bootstrap: A React UI component library.
- **CSS**: Application-specific styling.

## Usefulness

### The programme provides the following 
1. *File Upload*: Browse your PC for a file and upload it to the server.
2. *File List*: Browse through the list of uploaded files and decide whether to download or delete them.
3. *File Download*: Obtain a copy of any uploaded file from the server.
4. *File Removal*: Delete any files that have been uploaded to the server.

![Screenshot from 2023-06-20 13-49-21](https://github.com/Aaniranjan-Saraf/SERVRE/assets/97801096/06a1810b-9efd-46c0-a33c-d3a164c8bad5)


## Setup

### Clone the repository: 
```sh
git clone https://github.com/Aaniranjan-Saraf/SERVRE.git
```
### Navigate to the project directory:
```sh
cd SERVRE
```
### Install dependencies:
```sh
npm install
```
### Start the development server:
```sh
npm start
```
### Open your browser and visit the ngrok link to access the application. 


## API Endpoints

- 'POST /upload': Take care of file upload. A file in the request body is expected.
- 'GET /download/:filename': Download a specific file by specifying it as an argument.
- 'GET /files': Get a list of all uploaded files.
- 'DELETE /remove/:filename': Delete a specific file by passing in the filename as an argument.


## Port Routing 
- The server listens on port 8080 by default. Adjust the port number in the'server.js' file as needed.
- Using Serveo, make the server public:
  1. install [Serveo](https://serveo.net/).
  2. Type in your terminal:
     

    ```
        ssh -R <subdomain>:80:localhost:8080 serveo.net
    ```
    
    ***Note:*** *Replace'<subdomain>' with your desired subdomain or leave it empty for a random subdomain. Incoming requests are sent to Serveo, which routes them to your local server.*
- Expose the web app running on port 3000 using ngrok:
  1. install [ngrok](https://ngrok.com/).
  2. Type in your terminal:
     

    ```
        http 3000 sh ngrok
    ```
    ngrok generates a temporary *public URL* that redirects inquiries to your local development server.

