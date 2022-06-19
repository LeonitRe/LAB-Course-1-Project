using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TrainerRegister.Models
{
    public class Trainer
    {
        public int TrainerId { get; set; }
        public string TrainerName { get; set; }
        public string TrainerUsername { get; set; }
        public string Email { get; set; }
        public string EmailPrivat { get; set; }
        public string PhoneNumber { get; set; }
        public string DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string City { get; set; }
        public string Nationality { get; set; }
        public string Address { get; set; }
        public string AgesGroups { get; set; }
        public string DateOfJoining { get; set; }
        public string PhotoFileName { get; set; }
        public object AgeGroups { get; internal set; }
    }
}
