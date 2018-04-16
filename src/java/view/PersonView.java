package view;

// classes imported from java.sql.*
import java.sql.PreparedStatement;
import java.sql.ResultSet;

// classes in my project
import dbUtils.*;
import model.person.*;

public class PersonView {

    public static StringData extractPerson(ResultSet results) {
        StringData person = new StringData();
        try {
            person.CUSTOMER_ID = FormatUtils.formatInteger(results.getObject("CUSTOMER_ID"));
            person.CUSTOMER_EMAIL = FormatUtils.formatString(results.getObject("CUSTOMER_EMAIL"));
            person.CUSTOMER_PASSWORD = FormatUtils.formatString(results.getObject("CUSTOMER_PASSWORD"));
            person.CUSTOMER_NICKNAME = FormatUtils.formatString(results.getObject("CUSTOMER_NICKNAME"));
            person.CUSTOMER_ROLE = FormatUtils.formatString(results.getObject("CUSTOMER_ROLE"));
        } catch (Exception e) {
            person.errorMsg = "Data Exception thrown in PersonView.extractPerson(): " + e.getMessage();
            System.out.println("*****" + person.errorMsg);
        }
        return person;
    }

    public static StringDataList buildPersonList(DbConn dbc) {

        StringDataList personList = new StringDataList();

        personList.dbError = dbc.getErr();
        if (personList.dbError.length() == 0) {

            String sql = "SELECT CUSTOMER_ID, CUSTOMER_EMAIL, CUSTOMER_NICKNAME, CUSTOMER_ROLE "
                    + "FROM CUSTOMERS ORDER BY CUSTOMER_EMAIL, CUSTOMER_ID";

            try {
                PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
                ResultSet results = stmt.executeQuery();

                while (results.next()) {
                    personList.add(extractPerson(results));
                }
            } catch (Exception e) {
                personList.dbError = "SQL Excepption thrown in PersonView.BuildPersonList(): " + e.getMessage();
                System.out.println("*****" + personList.dbError);
            }
        }
        return personList;
    }

    public static StringData findPersonById(DbConn dbc, String id) {

        StringData person = new StringData();

        if (id == null) {
            person.errorMsg = "Programmer error in PersonView.findPersonById(): null id.";
            return person;
        }

        person.errorMsg = dbc.getErr();
        if (person.errorMsg.length() == 0) {

            String sql = "SELECT CUSTOMER_ID, CUSTOMER_EMAIL, CUSTOMER_NICKNAME, CUSTOMER_ROLE "
                    + "FROM CUSTOMERS WHERE CUSTOMER_ID = ?";

            try {
                PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
                stmt.setString(1, id);
                ResultSet results = stmt.executeQuery();

                if (results.next()) {
                    person = extractPerson(results);
                }
            } catch (Exception e) {
                person.errorMsg = "SQL Exception thrown in PersonView.FindPersonById(): " + e.getMessage();
                System.out.println("*****" + person.errorMsg);
            }
        }
        return person;
    }

    public static StringData findPersonByLogon(DbConn dbc, String userName, String pw) {

        StringData person = new StringData();

        if (userName == null) {
            person.errorMsg = "Programmer error in PersonView.findPersonByLogon(): null userName.";
            return person;
        }
        if (pw == null) {
            person.errorMsg = "Programmer error in PersonView.findPersonByLogon(): null pw.";
            return person;
        }

        person.errorMsg = dbc.getErr();
        if (person.errorMsg.length() == 0) {

            String sql = "SELECT * "
                    + "FROM CUSTOMERS WHERE CUSTOMER_EMAIL=? AND CUSTOMER_PASSWORD=?";

            try {
                PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
                stmt.setString(1, userName);
                stmt.setString(2, pw);
                ResultSet results = stmt.executeQuery();

                if (results.next()) {
                    person = extractPerson(results);
                }
            } catch (Exception e) {
                person.errorMsg = "SQL Exception thrown in PersonView.findPersonByLogon(): " + e.getMessage();
                System.out.println("*****" + person.errorMsg);
            }
        }
        return person;
    }
}