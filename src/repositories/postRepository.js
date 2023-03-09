import db from "../config/db.js"
import dayjs from "dayjs";

export async function getPostsRepository(){
    return await db.query(`
        SELECT p.description, p.external_link, p.publish_date, u.name, u.profile_picture 
        FROM posts p 
        JOIN users u 
        ON p.user_id = u.id
        ORDER BY p.publish_date DESC
        LIMIT 20`);
}

export async function registerPostRepository(userId, description, externalLink){
    const date = dayjs();
    await db.query(`
    INSERT INTO posts (user_id, description, external_link, publish_date) 
    VALUES ($1, $2, $3, $4)`, [userId, description, externalLink, date]);
}

export async function alterPostRepository(postId, userId, description){
    const postUserId = await db.query(`SELECT user_id FROM posts WHERE id = $1`, [postId]);
    const validUser = postUserId.rows[0].user_id === userId;
    
    if(validUser){
        await db.query(`UPDATE posts SET description = $1 WHERE id = $2`, [description, postId]);
    }
}

export async function deletePostRepository(postId, userId){
    const postUserId = await db.query(`SELECT user_id FROM posts WHERE id = $1`, [postId]);
    const validUser = postUserId.rows[0].user_id === userId;

    if(validUser){
        await db.query(`DELETE FROM posts WHERE id = $1`, [postId]);
    }
}
