using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace IagoAuction.Models
{
    public class Painting
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Author { get; set; }

        [Column(TypeName = "decimal(5, 2)")]
        public decimal? SuggestedStartPrice { get; set; }
        public string ImageUrl { get; set; }

        public int? LotId { get; set; }
        [ForeignKey("LotId")]
        public Lot Lot { get; set; }
    }
}
