package model.products;

import dbUtils.*;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

public class StringDataList {

    public String dbError = "";
    private ArrayList<StringData> recordList = new ArrayList();

    // Default constructor just leaves the 2 data members initialized as above
    public StringDataList() {
    }

    // overloaded constructor populates the list (and possibly the dbError)
    public StringDataList(String productNameStartsWith, DbConn dbc) {

        StringData sd = new StringData();

        System.out.println("Searching for products that start with " + productNameStartsWith);

        try {

            String sql = "SELECT PRODUCT_ID, PRODUCT_NAME, IMAGE_URL, PRODUCT_URL, PRICE, RATING FROM PRODUCTS WHERE PRODUCT_NAME LIKE ?";

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            stmt.setString(1, productNameStartsWith + "%");
            ResultSet results = stmt.executeQuery();

            while (results.next()) {
                try {
                    sd = new StringData();
                    sd.PRODUCT_ID = FormatUtils.formatInteger(results.getObject("PRODUCT_ID"));
                    sd.PRODUCT_NAME = FormatUtils.formatString(results.getObject("PRODUCT_NAME"));
                    sd.IMAGE_URL = FormatUtils.formatString(results.getObject("IMAGE_URL"));
                    sd.PRODUCT_URL = FormatUtils.formatString(results.getObject("PRODUCT_URL"));
                    sd.PRICE = FormatUtils.formatDollar(results.getObject("PRICE"));
                    sd.RATING = FormatUtils.formatInteger(results.getObject("RATING"));
                    this.recordList.add(sd);
                } catch (Exception e) {
                    sd.errorMsg = "Record Level Error in model.products.StringDataList Constructor: " + e.getMessage();
                    this.recordList.add(sd);
                }
            } // while
        } catch (Exception e) {
            this.dbError = "List Level Error in model.products.StringDataList Constructor: " + e.getMessage();
        }
        
        
    } // method
    
    public void add(StringData stringData) {
        this.recordList.add(stringData);
    }

} // class
