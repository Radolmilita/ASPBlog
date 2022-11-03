﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ServerApp.Controllers
{
    public class PostsController : ControllerBase
    {
        readonly IPostService postService;

        public PostsController(IPostService postService)
        {
            this.postService = postService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostModel>>> Get([FromQuery] PostFilterSearchModel filter) 
        {
            return Ok(await postService.GetAllPostsWithFilterAsync(filter));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PostModel>> GetById(int id) 
        {
            var post = await postService.GetByIdAsync(id);
            if (post is null)
                return NotFound("No such post");

            return Ok(post);
        }

        [HttpGet("{id}/comments")]
        public async Task<ActionResult<IEnumerable<CommentModel>>> GetComments(int id, [FromQuery] CommentFilterSearchModel filter) 
        {
            filter.PostId = id;

            try
            {
                return Ok(await postService.GetAllCommentsWithFilterAsync(filter));
            }
            catch(BlogException ex) 
            { 
                return BadRequest(ex);  
            }
        }

        [HttpPost]
        public async Task<ActionResult> Add([FromBody] PostModel post) 
        {
            try
            {
                await postService.AddAsync(post);

                return Ok(post);
            }
            catch (BlogException ex) 
            {
                return BadRequest(ex);
            }
        }

        [HttpPost("{id}/comments"), Authorize]
        public async Task<ActionResult> Add(int id, [FromBody] CommentModel comment)
        {
            comment.Id = id;

            try
            {
                await postService.AddCommentAsync(comment);

                return Ok(comment);
            }
            catch (BlogException ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPut("{id}"), Authorize]
        public async Task<ActionResult> Update(int id, [FromBody] PostModel post)
        {
            if (id != post.Id)
                return BadRequest("No such post");

            try
            {
                await postService.UpdateAsync(post);

                return Ok(post);
            }
            catch (BlogException ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPut("{postId}/comments/{commentId}"), Authorize]
        public async Task<ActionResult> UpdateComment(int postId, int commentId, [FromBody] CommentModel comment)
        {
            if (comment.Id != commentId || comment.PostId != postId)
                return BadRequest("No such comment");

            try
            {
                await postService.UpdateCommentAsync(comment);

                return Ok(comment);
            }
            catch (BlogException ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpDelete("{id}"), Authorize]
        public async Task<ActionResult> Delete(int id)
        {
            await postService.DeleteAsync(id);

            return Ok();
        }

        [HttpDelete("{postId}/comments/{commentId}"), Authorize]
        public async Task<ActionResult> DeleteComment(int postId, int commentId)
        {
            await postService.DeleteCommentAsync(commentId);

            return Ok();
        }
    }
}
