using Application.Models;

namespace Application.Interfaces
{
    public interface IPostService : ICrud<PostModel>
    {
        Task<IEnumerable<CommentModel>> GetAllPostCommentAsync(int postModelId);

        Task<IEnumerable<CommentModel>> GetAllCommentWithFilterAsync(CommentFilterSearchModel model);

        Task<IEnumerable<PostModel>> GetAllPostWithFilterAsync(PostFilterSearchModel model);

        Task AddCommentAsync(CommentModel commentModel);

        Task UpdateCommentAsync(CommentModel commentModel);

        Task RemoveCommentAsync(int commentModelId);
    }
}
