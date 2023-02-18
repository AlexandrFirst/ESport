using System;
using System.Collections.Generic;
using System.Text;

namespace UserWorkFlow.Infrastructure.Commands
{
    public interface ICommandResult
    {
        bool Succeeded { get; }
        int? ItemId { get; }
        Guid? IdAsGuid { get; }
        IEnumerable<string> Errors { get; }
        Exception ResultException { get; }
    }
}
