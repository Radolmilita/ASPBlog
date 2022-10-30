using AutoMapper;

namespace Infrastructure.Mappers
{
    public class Map : IMap
    {
        readonly IMapper mapper;

        public Map(IMapper mapper)
        {
            this.mapper = mapper;
        }

        public T Convert<T, U>(U model)
            where T : class
            where U : class
        {
            return mapper.Map<T>(model);
        }
    }
}
