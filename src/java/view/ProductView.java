package view;

// classes imported from java.sql.*
import java.sql.PreparedStatement;
import java.sql.ResultSet;

// classes in my project
import dbUtils.*;
import model.products.*;

public class ProductView {

    public static StringData extractPerson(ResultSet results) {
        StringData sd = new StringData();
        try {
            sd.PRODUCT_ID = FormatUtils.formatInteger(results.getObject("PRODUCT_ID"));
            sd.PRODUCT_NAME = FormatUtils.formatString(results.getObject("PRODUCT_NAME"));
            sd.IMAGE_URL = FormatUtils.formatString(results.getObject("IMAGE_URL"));
            sd.PRODUCT_URL = FormatUtils.formatString(results.getObject("PRODUCT_URL"));
            sd.PRICE = FormatUtils.formatDollar(results.getObject("PRICE"));
            sd.RATING = FormatUtils.formatInteger(results.getObject("RATING"));
        } catch (Exception e) {
            sd.errorMsg = "Data Exception thrown in PersonView.extractPerson(): " + e.getMessage();
            System.out.println("*****" + sd.errorMsg);
        }
        return sd;
    }

    public static StringDataList buildProductList(DbConn dbc) {

        StringDataList productList = new StringDataList();

        productList.dbError = dbc.getErr();
        if (productList.dbError.length() == 0) {

            String sql = "SELECT PRODUCT_ID, PRODUCT_NAME, RATING, IMAGE_URL"
                    + "FROM PRODUCTS ORDER BY PRODUCT_NAME, PRODUCT_ID";

            try {
                PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
                ResultSet results = stmt.executeQuery();

                while (results.next()) {
                    productList.add(extractPerson(results));
                }
            } catch (Exception e) {
                productList.dbError = "SQL Excepption thrown in PersonView.BuildPersonList(): " + e.getMessage();
                System.out.println("*****" + productList.dbError);
            }
        }
        return productList;
    }

    public static StringData findPersonById(DbConn dbc, String id) {

        StringData person = new StringData();

        if (id == null) {
            person.errorMsg = "Cannot find person with null id.";
            return person;
        }

        person.errorMsg = dbc.getErr();
        if (person.errorMsg.length() == 0) {

            String sql = "SELECT PRODUCT_ID, PRODUCT_NAME, RATING, IMAGE_URL "
                    + "FROM PRODUCTS WHERE PRODUCT_ID = ?";

            try {
                PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
                stmt.setString(1, id);
                ResultSet results = stmt.executeQuery();

                if (results.next()) {
                    person = extractPerson(results);
                }
            } catch (Exception e) {
                person.errorMsg = "SQL Exception thrown in PersonView.BuildPerson(): " + e.getMessage();
                System.out.println("*****" + person.errorMsg);
            }
        }
        return person;
    }

}
