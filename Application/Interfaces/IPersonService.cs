using Application.Models;

namespace Application.Interfaces
{
    public interface IPersonService : ICrud<PersonModel>
    {
        Task<IEnumerable<CommentModel>> GetAllPersonCommentsAsync(int personModelId);

        Task<IEnumerable<PostModel>> GetAllPersonPostsAsync(int personModelId);

        Task<IEnumerable<PersonModel>> GetAllPersonWithFilterAsync(PersonFilterSearchModel model);

        Task<IEnumerable<CommentModel>> GetAllCommentWithFilterAsync(CommentFilterSearchModel model);

        Task<IEnumerable<PostModel>> GetAllPostWithFilterAsync(PostFilterSearchModel model);
    }
}
