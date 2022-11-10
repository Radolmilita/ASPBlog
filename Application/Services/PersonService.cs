using Application.Interfaces;
using Application.Models;
using Application.Validation;

namespace Application.Services
{
    public class PersonService : IPersonService
    {
        readonly IUnitOfWork unitOfWork;

        readonly IMap map;

        public PersonService(IUnitOfWork unitOfWork, IMap map)
        {
            this.unitOfWork = unitOfWork;

            this.map = map;
        }

        public async Task AddAsync(PersonModel model)
        {
            Validation(model);

            var person = map.Convert<Person, PersonModel>(model);

            await unitOfWork.PersonRepository.AddAsync(person);

            await unitOfWork.SaveAsync();
        }

        public async Task DeleteAsync(int modelId)
        {
            await unitOfWork.PersonRepository.DeleteByIdAsync(modelId);

            await unitOfWork.SaveAsync();
        }

        public async Task<IEnumerable<PersonModel>> GetAllAsync()
        {
            var list = await unitOfWork.PersonRepository.GetAllWithDetailsAsync();

            return map.Convert<IEnumerable<PersonModel>, IEnumerable<Person>>(list);
        }

        public async Task<IEnumerable<PersonModel>> GetAllPersonWithFilterAsync(PersonFilterSearchModel model)
        {
            var list = await GetAllAsync();

            if (model.PersonName is string name)
                list = list.Where(t => t.FirstName == name);

            if (model.Order)
                list = list.OrderByDescending(t => t.Id);

            if (model.Page is int page && model.Limit is int limit)
                list = list.Skip(page * limit).Take(limit);

            return list;
        }

        public async Task<IEnumerable<CommentModel>> GetAllPersonCommentsAsync(int personModelId)
        {
            var list = (await unitOfWork
                .PersonRepository
                .GetByIdWithDetailsAsync(personModelId))
                .Comments;

            return map.Convert<IEnumerable<CommentModel>, IEnumerable<Comment>>(list);
        }

        public async Task<IEnumerable<CommentModel>> GetAllCommentWithFilterAsync(CommentFilterSearchModel model)
        {
            if (model.PersonId is null)
                throw new BlogException("Id s nill.");

            var list = await GetAllPersonCommentsAsync((int)model.PersonId);

            if (model.Page is int page && model.Limit is int limit)
                list = list.Skip(page * limit).Take(limit);

            return list;
        }

        public async Task<IEnumerable<PostModel>> GetAllPersonPostsAsync(int personModelId)
        {
            var list = (await unitOfWork
                .PersonRepository
                .GetByIdWithDetailsAsync(personModelId))
                .Posts;

            return map.Convert<IEnumerable<PostModel>, IEnumerable<Post>>(list);
        }

        public async Task<IEnumerable<PostModel>> GetAllPostWithFilterAsync(PostFilterSearchModel model)
        {
            if (model.PersonId is null)
                throw new BlogException("Id s nill.");

            var list = await GetAllPersonPostsAsync((int)model.PersonId);

            if (model.Page is int page && model.Limit is int limit)
                list = list.Skip((page - 1) * limit).Take(limit);

            return list;
        }

        public async Task<PersonModel> GetByIdAsync(int id)
        {
            var person = await unitOfWork.PersonRepository.GetByIdWithDetailsAsync(id);

            return map.Convert<PersonModel, Person>(person);
        }

        public async Task UpdateAsync(PersonModel model)
        {
            Validation(model);

            var person = map.Convert<Person, PersonModel>(model);

            unitOfWork.PersonRepository.Update(person);

            await unitOfWork.SaveAsync();
        }

        static void Validation(PersonModel model)
        {
            if (model is null)
                throw new BlogException("Model is null.");

            if (model.Login == string.Empty || model.Password == string.Empty)
                throw new BlogException("Login or password is empty.");

            if (model.FirstName == string.Empty || model.LastName == string.Empty)
                throw new BlogException("Name is empty.");

            if (DateTime.Now.Year - model.BirthDate.Value.Year < 0 || DateTime.Now.Year - model.BirthDate.Value.Year > 150)
                throw new BlogException("Date is incorrect.");
        }
    }
}
