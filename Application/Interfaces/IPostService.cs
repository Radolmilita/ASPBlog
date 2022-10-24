using Application.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IPostService : ICrud<PostModel>
    {
        Task<IEnumerable<CommentModel>> GetAllPostCommentsAsync(int postModelId);
        Task<IEnumerable<CommentModel>> GetAllCommentsWithFilterAsync(CommentFilterSearchModel model);
        Task<IEnumerable<PostModel>> GetAllPostsWithFilterAsync(PostFilterSearchModel model);
        Task AddCommentAsync(CommentModel model);
        Task UpdateCommentAsync(CommentModel model);
        Task DeleteCommentAsync(int id);
    }
}
