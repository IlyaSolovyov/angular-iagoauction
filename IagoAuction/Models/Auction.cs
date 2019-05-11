using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IagoAuction.Models
{
    public class Auction
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public List<Lot> Lots { get; set; }

        public Auction()
        {
            this.Lots = new List<Lot>();
        }
    }
}
