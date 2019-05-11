using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IagoAuction.Models
{
    public class Bid
    {
        public int Id { get; set; }
        public decimal Value { get; set; }
        public DateTime Date { get; set; }

        public int LotId { get; set; }
        public Lot Lot { get; set; }

        public int BidderId { get; set; }
        public Bidder Bidder { get; set; }
    }
}
