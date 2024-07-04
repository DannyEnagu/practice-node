const axios = require('axios');
const fs = require('fs').promises;


axios.get('https://jsonplaceholder.typicode.com/posts')
    .then((response) => {
        console.log('Successfully retrieved our list of Posts');
        let postList = '';
        response.data.forEach(post => {
            postList += `${post['title']}, ${post['body']}\n`;
        });

        return fs.writeFile('promisePosts.csv', postList);
    })
    .then(() => {
        console.log('Saved our list of Post to promisePosts.csv');
    })
    .catch((error) => {
        console.error(`Could not save the Post list to a file: ${error}`);
    });
