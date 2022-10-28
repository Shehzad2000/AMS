using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace AirlineManagementSystem.Models
{
    
    public class BLCountry
    {
        public int CountryID { get; set; }
        public string CountryName { get; set; }
    }
    public class MainLogic
    {
        static string  cs = ConfigurationManager.ConnectionStrings["con"].ConnectionString;
        public static int AddAndUpdate(BLCountry country)
        {
            int i;
            using (SqlConnection con=new SqlConnection(cs))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("sp_ForCountry", con);
                SqlParameter[] prm = new SqlParameter[3];
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                if (country.CountryID==0)
                    cmd.Parameters.AddWithValue("@Type", Types.Insert);
                else
                    cmd.Parameters.AddWithValue("@Type", Types.Update);
                
                
                cmd.Parameters.AddWithValue("@CountryID", country.CountryID);
                cmd.Parameters.AddWithValue("@CountryName", country.CountryName);
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }
        public static int Delete(int ID)
        {
            int i;
            using(SqlConnection con=new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("sp_ForCountry", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Type", Types.Delete);
                cmd.Parameters.AddWithValue("@CountryID", ID);
                con.Open();
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }
        public static List<BLCountry> ListAll()
        {
            List<BLCountry> list = new List<BLCountry>();
            using(SqlConnection con=new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("sp_ForCountry", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Type", Types.Select);
                con.Open();
                SqlDataReader sdr = cmd.ExecuteReader();
                while(sdr.Read())
                {
                    list.Add(new BLCountry
                    {
                        CountryID = Convert.ToInt32(sdr["CountryID"]),
                        CountryName = sdr["CountryName"].ToString(),
                    });
                }
            }
            return list;
        }

    }
}