namespace OcelotAuthClient
{
    public class AuthRequestHeaders
    {
        public static AuthRequestHeaders Id { get; } = new AuthRequestHeaders("Id");
        public static AuthRequestHeaders Name { get; } = new AuthRequestHeaders("Name");
        public static AuthRequestHeaders Role { get; } = new AuthRequestHeaders("Role");
        public static AuthRequestHeaders Email { get; } = new AuthRequestHeaders("Email");

        public string Value { get; }
        private AuthRequestHeaders(string name)
        {
            Value = name;
        }
    }
}
