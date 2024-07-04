const request = require('request');
const fs = require('fs');

request('https://jsonplaceholder.typicode.com/posts', (error, response, body) => {
    if (error) {
        console.error(`Could not send request to API: ${error.message}`);
        return;
    }

    if (response.statusCode != 200) {
        console.error(`Expected status code 200 but received ${response.statusCode}.`);
        return;
    }

    console.log('Processing our list of Posts');
    posts = JSON.parse(body);
    let postList = '';
    posts.forEach(post => {
        postList += `${post['title']}, ${post['body']}`;
    });

    fs.writeFile('callbackPosts.csv', postList, (error) => {
        if (error) {
            console.error(`Could not save the Post List to a file: ${error}`);
            return;
        }

        console.log('Saved our list of movies to callbackPosts.csv');;
    });

});
