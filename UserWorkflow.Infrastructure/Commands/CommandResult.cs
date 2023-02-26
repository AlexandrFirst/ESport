using System;
using System.Collections.Generic;
using System.Text;

namespace UserWorkFlow.Infrastructure.Commands
{
    public class CommandResult : ICommandResult
    {
        public bool Succeeded { get; }

        public IEnumerable<string> Errors { get; }

        public Exception ResultException { get; }

        public int? ItemId { get; }

        public Guid? IdAsGuid { get; }


        public CommandResult(IEnumerable<string> errors, Exception resultException = null)
        {
            Succeeded = false;
            Errors = errors;
            ResultException = resultException;
        }

        public CommandResult(int itemId = 0)
        {
            ItemId = itemId;
        }

        public CommandResult(Guid idAsGuid)
        {
            IdAsGuid = idAsGuid;
        }
    }
}
