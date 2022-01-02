using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.OrderAggregate
{
    public class DeliveryMethod :BaseEntity
    {
        public string ShortName { get; set; }
        public string DateTime { get; set; }
        public string Description { get; set; }
         public decimal Price { get; set; }
    }
}