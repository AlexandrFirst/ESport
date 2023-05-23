using System.Linq.Expressions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserWorkflow.Application.Models.Base
{
    public enum LogicalOperation { OR, AND}

    public static class ConditionExtension
    {
        public static IQueryable<TSource> Or<TSource>(this IQueryable<TSource> source, IEnumerable<Expression<Func<TSource, bool>>> predicates)
        {
            if (predicates == null || !predicates.Any()) 
            {
                return source;
            }

            var parameter = Expression.Parameter(typeof(TSource));
            var orExpression = predicates
                .Select(predicate => (Expression)Expression.Invoke(predicate, parameter))
                .Aggregate((left, right) => Expression.OrElse(left, right));
            var lambda = Expression.Lambda<Func<TSource, bool>>(orExpression, parameter);
            return source.Where(lambda);
        }
    }
}
