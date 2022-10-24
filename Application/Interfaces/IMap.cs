namespace Application.Interfaces
{
    public interface IMap
    {
        public T Convert<T, U>(U model)
            where T : class
            where U : class;
    }
}
