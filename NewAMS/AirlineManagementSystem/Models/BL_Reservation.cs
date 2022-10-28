using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace AirlineManagementSystem.Models
{
    public class BL_Reservation
    {
        public int ReservationID { get; set; }
        public string Name { get; set; }
        public string CNIC { get; set; }
        public string Email { get; set; }
        public string ContactNo { get; set; }
        public string PassportNo { get; set; }
        public int CabinID { get; set; }
        public int SheduleID { get; set; }
        public int ReservationCode { get; set; }
        public DateTime DOB { get; set; }
        public int Nationality { get; set; }
        public int Status { get; set; }
        public int SeatNo { get; set; }
    }
    public class ReservationMainLogic
    {
        static string cs = ConfigurationManager.ConnectionStrings["con"].ConnectionString;
        public static int AddorUpdate(BL_Reservation obj)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("sp_ForReservation", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                if (obj.ReservationID == 0)
                    cmd.Parameters.AddWithValue("@Type", Types.Insert);
                else
                    cmd.Parameters.AddWithValue("@Type", Types.Update);
                cmd.Parameters.AddWithValue("@ReservationID", obj.ReservationID);
                cmd.Parameters.AddWithValue("@Name", obj.Name);
                cmd.Parameters.AddWithValue("@CNIC", obj.CNIC);
                cmd.Parameters.AddWithValue("@ContactNo", obj.ContactNo);
                cmd.Parameters.AddWithValue("@PassportNo", obj.PassportNo);
                cmd.Parameters.AddWithValue("@CabinID", obj.CabinID);
                cmd.Parameters.AddWithValue("@SheduleID", obj.SheduleID);
                cmd.Parameters.AddWithValue("@ReservationCode", obj.ReservationCode);
                cmd.Parameters.AddWithValue("@DOB", obj.DOB);
                cmd.Parameters.AddWithValue("@Nationality", obj.Nationality);
                cmd.Parameters.AddWithValue("@Status", obj.Status);
                cmd.Parameters.AddWithValue("@SeatNo", 1);
                con.Open();
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }
        public static int Delete(int ID)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("sp_ForReservation", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Type", Types.Delete);
                cmd.Parameters.AddWithValue("@ReservationID", ID);
                con.Open();
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }
        public static List<BL_Reservation> GetData()
        {
            List<BL_Reservation> list = new List<BL_Reservation>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("sp_ForReservation", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Type", Types.Select);
                con.Open();
                SqlDataReader sdr = cmd.ExecuteReader();
                while (sdr.Read())
                {
                    list.Add(new BL_Reservation
                    {
                        ReservationID = Convert.ToInt32(sdr["ReservationID"]),
                        Name = Convert.ToString(sdr["Name"]),
                        CNIC = Convert.ToString(sdr["CNIC"]),
                        ContactNo = Convert.ToString(sdr["ContactNo"]),
                        PassportNo = Convert.ToString(sdr["PassportNo"]),
                        CabinID = Convert.ToInt32(sdr["CabinID"]),
                        SheduleID = Convert.ToInt32(sdr["SheduleID"]),
                        DOB = Convert.ToDateTime(sdr["DOB"]),
                        Nationality = Convert.ToInt32(sdr["Nationality"]),
                        Status = Convert.ToInt32(sdr["Status"]),
                    });
                }
            }
            return list;

        }
    }
}