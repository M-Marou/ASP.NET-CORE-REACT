using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace IntelviaStore.Models
{
    public class ProductsModel
    {
        [Key]
        public int ProductID { get; set; }

        public string ProductName { get; set; }

        public string Description { get; set; }

        [NotMapped]
        public IFormFile ImageFile { get; set; }

        public string ImageName { get; set; }

        [NotMapped]
        public string ImageSrc { get; set; }

        //public CategoriesModel Categories { get; set; }
    }
}
