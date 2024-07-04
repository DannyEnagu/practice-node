const axios = require('axios');
const fs = require('fs').promises;

async function savePosts(){
    try {
        let response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        let postList = '';
        response.data.forEach(post => {
            postList += `${post['title']}, ${post['body']}\n`;
        });
        await fs.writeFile('asyncAwaitPosts.csv', postList);
	console.log('Saved our list of post to asyncAwaitPosts.csv');
    } catch (error) {
        console.error(`Could not save the Post list to a file: ${error}`);
    }
}

savePosts();
