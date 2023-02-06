namespace OcelotAuthClient
{
    public enum AuthClaims { Id, Name, Role, Email}

    public class AuthRequestData
    {
        public static AuthRequestData Id { get; } = new AuthRequestData(AuthClaims.Id);
        public static AuthRequestData Name { get; } = new AuthRequestData(AuthClaims.Name);
        public static AuthRequestData Role { get; } = new AuthRequestData(AuthClaims.Role);
        public static AuthRequestData Email { get; } = new AuthRequestData(AuthClaims.Email);

        public string Value { get; }
        public AuthClaims authClaims { get; }

        private AuthRequestData(AuthClaims authClaims)
        {
            Value = authClaims.ToString();
            this.authClaims = authClaims;
        }

        public override bool Equals(object obj)
        {
            return obj is AuthRequestData data &&
                   Value == data.Value &&
                   authClaims == data.authClaims;
        }
    }
}
