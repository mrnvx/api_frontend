window.onload = function() {
    const getForm = document.getElementById('get-user-form');
    getForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        let formData = new FormData(event.target);
        let token = formData.get('token');

        try {
            const response = await fetch('http://127.0.0.1:8000/api/userdata', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/html'
                }
            });

            const data = await response.json();

            if (response.ok) {
                document.getElementById('user-data').innerHTML = `<p>User Email: ${data.email}<br>
                                                                    User Name: ${data.name}</p>`;
                await fetchAllPosts(token);
            }

        } catch (error) {
           console.log(error);
        }
    });

    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        let formData = new FormData(event.target);
        // let token = formData.get('token');

        try {
            const response = await fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: {
                    'Accept': `application/json`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formData.get('email'),
                    password: formData.get('password')
                })
            });

            const data = await response.json();

            if (response.ok) {
                document.getElementById('login-data').innerHTML = `<p>Login Successfully!</p>
                                                                  <p><strong>Email:</strong> ${data.user.email}, 
                                                                  <strong>Name:</strong> ${data.user.name},
                                                                  <strong>Token:</strong> ${data.token}</p>`;
                //  await fetchAllPosts(token);
                alert(`Login successful! Token: ${data.token}`);
            }

        } catch (error) {
            console.log(error);
        }
    });

    const registersForm = document.getElementById('register-form');
    registersForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        let formData = new FormData(event.target);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.get('name'),
                    email: formData.get('email'),
                    password: formData.get('password'),
                    password_confirmation: formData.get('password_confirmation')
                })
            });

            const data = await response.json();

            if (response.ok) {
                document.getElementById('register-data').innerHTML = `<p>Register Successfully!</p>
                                                                  <p><strong>Name:</strong> ${data.user.name},
                                                                  <strong>Email:</strong> ${data.user.email}, 
                                                                  <strong>Password:</strong> ${data.user.password},
                                                                  <strong>Token:</strong> ${data.token}</p>`;
            }  else {
            // Handle registration errors (validation or server errors)
            document.getElementById('register-data').innerHTML = `<p>Error: ${data.message}</p>`;
        }
            

        } catch (error) {
            console.log(error);
        }
    });

    const postForm = document.getElementById('create-post-form');
    postForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        let formData = new FormData(event.target);
        let token = formData.get('token');

        try {
            const response = await fetch('http://127.0.0.1:8000/api/posts', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: formData.get('title'),
                    body: formData.get('body')
                })
            });

            const data = await response.json();

            if (response.ok) {
                document.getElementById('post-data').innerHTML = `<p>Post Created Successfully!</p>
                                                                  <p><strong>Title:</strong> ${data.title}, <strong>Body:</strong> ${data.body}</p>`;
                await fetchAllPosts(token);

                document.getElementById('title').value = '';
                document.getElementById('body').value = '';
            }

        } catch (error) {
            console.log(error);
        }
    });

    async function fetchAllPosts(token) {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/posts', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const posts = await response.json();

            if (response.ok) {
                const postsContainer = document.getElementById('user-posts');
                postsContainer.innerHTML = '';

                // Sort posts from newest to oldest
                posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

                posts.forEach(post => {
                    postsContainer.innerHTML += `
                    <div class="post">
                        <p><strong>Title:</strong> ${post.title}</p>
                        <p><strong>Body:</strong> ${post.body}</p>
                        <p><strong>Created At:</strong> ${new Date(post.created_at).toLocaleString()}</p>
                    </div>  
                    `;
                });
            
            }
        } catch (error) {
            console.log(error);
        }
    }

    const token = document.getElementById('token').value;
    if (token) {
        fetchAllPosts(token);
    }

    const loginFormContainer = document.getElementById('login-form-container');
    const registerFormContainer = document.getElementById('register-form-container');
    const getUserFormContainer = document.getElementById('get-user-form-container');
    const createPostFormContainer = document.getElementById('create-post-form-container');
    const postsContainer = document.getElementById('posts-container');

    // Initially hide all forms except login and register
    getUserFormContainer.style.display = 'none';
    createPostFormContainer.style.display = 'none';
    postsContainer.style.display = 'none';
    loginFormContainer.style.display = 'none';
    registerFormContainer.style.display = 'none';

    // Show the login form when the "Login" button is clicked
    document.getElementById('login-btn').addEventListener('click', function () {
        loginFormContainer.style.display = 'block';
        registerFormContainer.style.display = 'none';
        getUserFormContainer.style.display = 'none';
        createPostFormContainer.style.display = 'none';
        postsContainer.style.display = 'none';
    });

    // Show the register form when the "Register" button is clicked
    document.getElementById('register-btn').addEventListener('click', function () {
        registerFormContainer.style.display = 'block';
        loginFormContainer.style.display = 'none';
        getUserFormContainer.style.display = 'none';
        createPostFormContainer.style.display = 'none';
        postsContainer.style.display = 'none';
    });

    // Show the Get User form when the login form is submitted
    document.getElementById('login-form').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form from submitting (for demo purposes)
        getUserFormContainer.style.display = 'block';
        loginFormContainer.style.display = 'none';
    });

    // Show Create Post form and Posts when Get User form is submitted
    document.getElementById('get-user-form').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form from submitting (for demo purposes)
        getUserFormContainer.style.display = 'none';
        createPostFormContainer.style.display = 'block';
        postsContainer.style.display = 'block';
    });
};