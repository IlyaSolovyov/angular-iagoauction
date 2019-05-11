using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace IagoAuction.Models
{
    public class Bid
    {
        public int Id { get; set; }

        [Column(TypeName = "decimal(5, 2)")]
        public decimal? Value { get; set; }
        public DateTime? Date { get; set; }

        public int? LotId { get; set; }
        public Lot Lot { get; set; }

        public int? BidderId { get; set; }
        [ForeignKey("BidderId")]
        public Bidder Bidder { get; set; }
    }
}
