using Ocelot.Errors;

namespace GateWay.Errors
{
    public class UnothorizedError : Error
    {
        public UnothorizedError(string message, OcelotErrorCode code, int httpStatusCode) : base(message, code, httpStatusCode)
        {
        }
    }
}
