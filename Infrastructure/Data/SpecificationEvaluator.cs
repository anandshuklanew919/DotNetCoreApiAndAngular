using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Specification;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{ // p=>p.ProductTypeId = id
    public class SpecificationEvaluator<TEntity> where TEntity : BaseEntity
    {
        public static IQueryable<TEntity> GetQuery(IQueryable<TEntity> inputQuery, 
            ISpecification<TEntity> Spec)
            {
                var query = inputQuery;

                if(Spec.Criteria != null)
                {
                    query = query.Where(Spec.Criteria); // p=>p.ProductTypeId = id
                }

                query = Spec.Includes.Aggregate(query,(current,include)=>current.Include(include));

                return query;
            }
    }
}