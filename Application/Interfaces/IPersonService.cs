using Application.Models;

namespace Application.Interfaces
{
    public interface IPersonService : ICrud<PersonModel>
    {
        Task<IEnumerable<CommentModel>> GetAllUserCommentsAsync(int personModelId);
        Task<IEnumerable<PostModel>> GetAllUsersPostsAsync(int personModelId);
        Task<IEnumerable<PersonModel>> GetAllUsersWithFilterAsync(PersonFilterSearchModel model);
        Task<IEnumerable<CommentModel>> GetAllCommentsWithFilterAsync(CommentFilterSearchModel model);
        Task<IEnumerable<PostModel>> GetAllPostsWithFilterAsync(PostFilterSearchModel model);
    }
}
