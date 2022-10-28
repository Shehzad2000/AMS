using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace AirlineManagementSystem.Models
{
    public class BLCabin
    {
        public int CabinID { get; set; }
        public string CabinName { get; set; }
    }
    public class CabinMainLogic
    {
        static string cs = ConfigurationManager.ConnectionStrings["con"].ConnectionString;
        public static int AddorUpdate(BLCabin obj)
        {
            int i;
            using(SqlConnection con=new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("sp_ForCabin", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                if (obj.CabinID == 0)
                    cmd.Parameters.AddWithValue("@Type", Types.Insert);
                else
                    cmd.Parameters.AddWithValue("@Type", Types.Update);
                cmd.Parameters.AddWithValue("@CabinID", obj.CabinID);
                cmd.Parameters.AddWithValue("@CabinName", obj.CabinName);
                con.Open();
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }
        public static int Delete(int ID)
        {
            int i;
            using(SqlConnection con=new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("sp_ForCabin", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Type", Types.Delete);
                cmd.Parameters.AddWithValue("@CabinID", ID);
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }
        public static List<BLCabin> GetData()
        {
            List<BLCabin> list = new List<BLCabin>();
            using(SqlConnection con=new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("sp_ForCabin", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Type", Types.Select);
                con.Open();
                SqlDataReader sdr = cmd.ExecuteReader();
                while(sdr.Read())
                {
                    list.Add(new BLCabin
                    {
                        CabinID = Convert.ToInt32(sdr["CabinID"]),
                        CabinName = sdr["CabinName"].ToString()
                    });
                }
            }
            return list;
            
        }
    }

}