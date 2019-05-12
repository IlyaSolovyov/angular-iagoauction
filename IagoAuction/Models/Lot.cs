using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Formatters.Xml;

namespace IagoAuction.Models
{
    public class Lot
    {
        public int Id { get; set; }

        public List<Bid> Bids { get; set; }

        public int? PaintingId { get; set; }
        [ForeignKey("paintingId")]
        public Painting Painting { get; set; }

        public int? AuctionId { get; set; }
        [ForeignKey("AuctionId")]
        public Auction Auction { get; set; }

        public Lot()
        {
            this.Bids = new List<Bid>();
        }
    }
}
