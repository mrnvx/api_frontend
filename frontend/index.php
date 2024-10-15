<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <script src="js/app.js"></script>
    <title>API Front</title>
</head>
<body>
    <h1>Laravel API frontend</h1>

    <!-- Buttons to toggle between Register and Login forms -->
    <div class="container" id="btns">
    <button id="register-btn">Register</button>
    <button id="login-btn">Login</button>
</div>
    <div class="container"  id="register-form-container">
        <h2>Register</h2>
        <form action="/api/register" method="post" id="register-form">
            <label for="name">Name</label>
            <input type="text" name="name" id="name">
            <label for="email">Email</label>
            <input type="text" name="email" id="email">
            <label for="password">Password</label>
            <input type="text" name="password" id="password">
            <label for="password_confirmation">Password confirmation</label>
            <input type="text" name="password_confirmation" id="password_confirmation">

            <input type="submit" value="Register">
        </form>
        <div id="register-data"></div>
    </div>

    <div class="container" id="login-form-container">
        <h2>Login</h2>
        <form action="/api/login" method="post" id="login-form">
            <label for="email">Email</label>
            <input type="text" name="email" id="email">
            <label for="password">Password</label>
            <input type="text" name="password" id="password">

            <input type="submit" value="Login">
        </form>
        <div id="login-data"></div>
    </div>

    <div class="container" id="get-user-form-container">
        <h2>Get user</h2>
        <form action="/api/user" method="get" id="get-user-form">
            <label for="token">Token</label>
            <input type="text" name="token" id="token">

            <input type="submit" value="Get">
        </form>
        <div id="user-data"></div>
    </div>

    

    <div class="container" id="create-post-form-container">
        <h2>Create post</h2>
        <form action="/api/posts" method="post" id="create-post-form">
            <label for="token">Token</label>
            <input type="text" name="token" id="token">

            <label for="title">Title</label>
            <input type="text" name="title" id="title">

            <label for="body">Body</label>
            <textarea name="body" id="body"></textarea>

            <input type="submit" value="Create">
        </form>
        <div id="post-data"></div>
    </div>
    <div class="container" id="posts-container">
        <h2>Posts</h2>
        <div id="user-posts"></div>
    </div>
</body>
</html>