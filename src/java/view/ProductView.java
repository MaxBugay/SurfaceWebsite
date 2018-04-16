package view;

// classes imported from java.sql.*
import java.sql.PreparedStatement;
import java.sql.ResultSet;

// classes in my project
import dbUtils.*;
import model.products.*;

public class ProductView {

    public static StringData extractProduct(ResultSet results) {
        StringData sd = new StringData();
        try {
            sd.PRODUCT_ID = FormatUtils.formatInteger(results.getObject("PRODUCT_ID"));
            sd.PRODUCT_NAME = FormatUtils.formatString(results.getObject("PRODUCT_NAME"));
            sd.IMAGE_URL = FormatUtils.formatString(results.getObject("IMAGE_URL"));
            sd.PRODUCT_URL = FormatUtils.formatString(results.getObject("PRODUCT_URL"));
            sd.PRICE = FormatUtils.formatDollar(results.getObject("PRICE"));
            sd.RATING = FormatUtils.formatInteger(results.getObject("RATING"));
        } catch (Exception e) {
            sd.errorMsg = "Data Exception thrown in ProductView.extractProduct(): " + e.getMessage();
            System.out.println("*****" + sd.errorMsg);
        }
        return sd;
    }

    public static StringDataList buildProductList(DbConn dbc) {

        StringDataList productList = new StringDataList();

        productList.dbError = dbc.getErr();
        if (productList.dbError.length() == 0) {

            String sql = "SELECT * "
                    + " FROM PRODUCTS ORDER BY PRODUCT_ID, PRODUCT_NAME";

            try {
                PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
                ResultSet results = stmt.executeQuery();
                System.out.println(results);
                
                while (results.next()) {
                    productList.add(extractProduct(results));
                }
            } catch (Exception e) {
                productList.dbError = "SQL Excepption thrown in ProductView.BuildProductList(): " + e.getMessage();
                System.out.println("*****" + productList.dbError);
            }
        }
        return productList;
    }

    public static StringData findProductById(DbConn dbc, String id) {

        StringData product = new StringData();

        if (id == null) {
            product.errorMsg = "Cannot find product with null id.";
            return product;
        }

        product.errorMsg = dbc.getErr();
        if (product.errorMsg.length() == 0) {

            String sql = "SELECT PRODUCT_ID, PRODUCT_NAME, PRICE, RATING, IMAGE_URL "
                    + "FROM PRODUCTS WHERE PRODUCT_ID = ?";

            try {
                PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
                stmt.setString(1, id);
                ResultSet results = stmt.executeQuery();

                if (results.next()) {
                    product = extractProduct(results);
                }
            } catch (Exception e) {
                product.errorMsg = "SQL Exception thrown in ProductView.BuildProduct(): " + e.getMessage();
                System.out.println("*****" + product.errorMsg);
            }
        }
        return product;
    }
}
