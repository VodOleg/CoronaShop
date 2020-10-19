using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoronaShopBE.Dto
{
    public class Credentials : IEquatable<Credentials>
    {
        [JsonProperty("email")]
        public string email { get; set; }

        [JsonProperty("pw")]
        public string pw { get; set; }

        public Credentials(string user, string pw_)
        {
            email = user;
            pw = pw_;
        }

        public override string ToString()
        {
            return email + " " + pw;
        }

        public override bool Equals(object obj)
        {
            return this.Equals(obj as Credentials);
        }

        public bool Equals(Credentials p)
        {
            // If parameter is null, return false.
            if (Object.ReferenceEquals(p, null))
            {
                return false;
            }

            // Optimization for a common success case.
            if (Object.ReferenceEquals(this, p))
            {
                return true;
            }

            // If run-time types are not exactly the same, return false.
            if (this.GetType() != p.GetType())
            {
                return false;
            }

            // Return true if the fields match.
            // Note that the base class is not invoked because it is
            // System.Object, which defines Equals as reference equality.
            return (email == p.email) && (pw == p.pw);
        }

        public static bool operator ==(Credentials lhs, Credentials rhs)
        {
            bool ret = (lhs != null) && (rhs != null);   //both not null
            if ( ret)
            {
                // check credentials only if both not null
                ret &= (lhs.email == rhs.email);             //both has same email
                ret &= (lhs.pw == rhs.pw);                   //both has same pw
            }

            ret |= (lhs == null) && (rhs == null); //if both null they equal

            return ret;
        }

        public static bool operator !=(Credentials lhs, Credentials rhs)
        {
            //first check if one of them null and the other is not
            bool ret = (lhs != null) && (rhs == null);
            ret |= (lhs == null) && (rhs != null);

            //if both not null compare members
            if (lhs!=null && rhs!=null)
            {
                ret |= (lhs.email != rhs.email);
                ret |= (lhs.pw != rhs.email);
            }
            else
            {
                //if both null they are equal
                ret = false;
            }
            return ret;
        }
    }

    
}
