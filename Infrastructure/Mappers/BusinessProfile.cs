using AutoMapper;

namespace Infrastructure.Mappers
{
    public class BusinessProfile : Profile
    {
        public BusinessProfile()
        {
            CreateMap<Person, PersonModel>()
                .ForMember(t => t.PostIds, t => t.MapFrom(n => n.Posts.Select(m => m.Id)))
                .ForMember(t => t.CommentIds, t => t.MapFrom(n => n.Comments.Select(m => m.Id)))
                .ReverseMap();

            CreateMap<Post, PostModel>()
                .ForMember(t => t.CommentIds, t => t.MapFrom(n => n.Comments.Select(m => m.Id)))
                .ReverseMap();

            CreateMap<Comment, CommentModel>()
                .ReverseMap();
        }
    }
}
