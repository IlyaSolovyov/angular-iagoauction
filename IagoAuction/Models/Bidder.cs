using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IagoAuction.Models
{
    public class Bidder
    {
        public int Id { get; set; }
        
        public string Name { get; set; }

        public List<Bid> Bids { get; set; }

        public Bidder()
        {
            this.Bids = new List<Bid>();
        }
    }
}
