using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace AirlineManagementSystem.Models
{
    public class BLCity
    {
        public int CountryID { get; set; }
        public  int CityID { get; set; }
        public  string CityName { get; set; }
    }
    public static class CityMainLogic
    {
        static string cs = ConfigurationManager.ConnectionStrings["con"].ConnectionString;
        public static int AddorUpdate(BLCity obj)
        {

            int i;
            using(SqlConnection con=new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("sp_ForCity", con);
                cmd.CommandType = CommandType.StoredProcedure;
                if(obj.CityID == 0)
                    cmd.Parameters.AddWithValue("@Type", Types.Insert);
                else
                    cmd.Parameters.AddWithValue("@Type", Types.Update);
                cmd.Parameters.AddWithValue("@CountryID", obj.CountryID);
                cmd.Parameters.AddWithValue("@CityID", obj.CityID);
                cmd.Parameters.AddWithValue("@CityName", obj.CityName);
                con.Open();
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }
        public static int Delete(int?ID)
        {
            int i;
            using(SqlConnection con=new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("sp_ForCity", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Type", Types.Delete);
                cmd.Parameters.AddWithValue("@CityID", ID);
                con.Open();
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }
        public static List<BLCity> GetData()
        {
           
            List<BLCity> list = new List<BLCity>();
            using(SqlConnection con=new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("sp_ForCity", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Type", Types.Select);
                
                con.Open();
                SqlDataReader sdr = cmd.ExecuteReader();
                while(sdr.Read())
                {
                    list.Add(new BLCity
                    {
                        CountryID = Convert.ToInt32(sdr["CountryID"]),
                        CityID = Convert.ToInt32(sdr["CityID"]),
                        CityName = Convert.ToString(sdr["CityName"])
                    });
                }
                return list;
            }
        }
        public static List<BLCity> GetData(int ID)
        {

            List<BLCity> list = new List<BLCity>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("sp_ForCity", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Type", Types.Select);
                cmd.Parameters.AddWithValue("@CountryID", ID);
                con.Open();
                SqlDataReader sdr = cmd.ExecuteReader();
                while (sdr.Read())
                {
                    list.Add(new BLCity
                    {
                        CountryID = Convert.ToInt32(sdr["CountryID"]),
                        CityID = Convert.ToInt32(sdr["CityID"]),
                        CityName = Convert.ToString(sdr["CityName"])
                    });
                }
                return list;
            }
        }
    }
}