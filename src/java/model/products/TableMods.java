package model.products;

import dbUtils.*;
import static java.lang.Integer.parseInt;

public class TableMods {

    /**
     * input parameters:
     *
     * inputData: an object that holds all the pre-validated fields that the
     * user wants to insert into the database, such as email_address, ...,
     * credit_limit. Remember that all fields in inputData are String type (even
 the dollar amount credit_limit) because this is PRE-VALIDATED data. dbc:
 an open DbConn database connection object.

 output parameter:

 If record is updated OK, return "" empty string. Otherwise, return a form
 level error message (e.g., if validation error, something like "please
 try again", or could be database error, or could be a programmer error.
     */
    public static StringData insert(StringData userData, DbConn dbc) {

        StringData errorMsgs = new StringData();

        System.out.println("In InsertUpdate.insert() ready to insert product with these values: " + userData.toString());

        errorMsgs = validate(userData);
        System.out.println("In InsertUpdate.insert() finished with validation");

        String formMsg = "";

        if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
            System.out.println("Validation errors: " + errorMsgs.toString());
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;
        } else { // all fields passed validation
            System.out.println("In InsertUpdate.insert() passed validation");

            // Start preparing SQL statement
            formMsg = dbc.getErr(); // will be empty string if DB connection is OK.
            if (formMsg.length() == 0) { // db connection is good

                // prepare the statement
                String sql = "INSERT INTO PRODUCTS (PRODUCT_NAME, PRICE, RATING) VALUES (?,?,?)";

                // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
                // Only difference is that Sally's class takes care of encoding null 
                // when necessary. And it also System.out.prints exception error messages.
                PrepStatement pStatement = new PrepStatement(dbc, sql);

                // Encoding string values into the prepared statement is pretty easy...
                pStatement.setString(1, userData.PRODUCT_NAME);
                pStatement.setBigDecimal(2, ValidationUtils.decimalConversion(userData.PRICE));
                pStatement.setInt(3, ValidationUtils.integerConversion(userData.RATING));

                System.out.println("ready to execute insert");

                // here the INSERT is actually executed
                int numRows = pStatement.executeUpdate();

                // This will return empty string if all went well, else all error messages.
                formMsg = pStatement.getErrorMsg();
                System.out.println("Error msg from after executing the insert: " + formMsg);

                if (formMsg.length() == 0) {
                    if (numRows == 1) {
                        formMsg = ""; // This means SUCCESS. Let the JSP page decide how to tell this to the user.
                    } else {
                        // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                        formMsg = numRows + " records were inserted when exactly 1 was expected.";
                    }
                    System.out.println("Number of records affected: " + numRows);
                }
            } // Db Connection is good - double check, JSP page should not send us a bad one... 
        } // customerId is not null and not empty string.
        errorMsgs.errorMsg = formMsg;
        return errorMsgs;
    } // constructor method

    /**
     * input parameters:
     *
     * inputData: an object that holds all the pre-validated fields that the
     * user wants to update into the database. Remember that all fields in
 inputData are String type because this is PRE-VALIDATED data. dbc: an
 open DbConn database connection object.

 output parameter:

 If record is updated OK, return "" empty string. Otherwise, return a form
 level error message (e.g., if validation error, something like "please
 try again", or could be database error, or could be a programmer error
 msg).
     */
    public static StringData update(StringData userData, DbConn dbc) {

        StringData errorMsgs = new StringData();

        System.out.println("In InsertUpdate.update() ready to update product with these values: " + userData.toString());

        if (userData.PRODUCT_ID == null) {
            errorMsgs.errorMsg = "Programmer error: for update, product Id should not be null.";
            return errorMsgs;
        }
        if (userData.PRODUCT_ID.length() == 0) {
            errorMsgs.errorMsg =  "Programmer error: for update, product Id should not be empty string.";
            return errorMsgs;
        }

        errorMsgs = validate(userData);
        System.out.println("In InsertUpdate.update() finished with validation");

        String formMsg = "";

        if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
            System.out.println("Validation errors: " + errorMsgs.toString());
            errorMsgs.errorMsg =  "Please try again";
            return errorMsgs;

        } else { // all fields passed validation
            System.out.println("In InsertUpdate.update() passed validation");

            // Start preparing SQL statement
            formMsg = dbc.getErr(); // will be empty string if DB connection is OK.
            if (formMsg.length() == 0) { // db connection is good

                // prepare the statement
                String sql = "UPDATE PRODUCTS SET PRODUCT_NAME=?, PRICE=?, RATING=? WHERE PRODUCT_ID=?";

                // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
                // Only difference is that Sally's class takes care of encoding null 
                // when necessary. And it also System.out.prints exception error messages.
                PrepStatement pStatement = new PrepStatement(dbc, sql);

                pStatement.setString(1, userData.PRODUCT_NAME);
                pStatement.setBigDecimal(2, ValidationUtils.decimalConversion(userData.PRICE));
                pStatement.setInt(3, ValidationUtils.integerConversion(userData.RATING));
                pStatement.setInt(4, ValidationUtils.integerConversion(userData.PRODUCT_ID));

                System.out.println("ready to execute update, id is " + userData.PRODUCT_ID);

                // here the UPDATE is actually executed
                int numRows = pStatement.executeUpdate();

                // This will return empty string if all went well, else all error messages.
                formMsg = pStatement.getErrorMsg();
                System.out.println("Error msg from after executing the update: " + formMsg);

                if (formMsg.length() == 0) {
                    if (numRows == 1) {
                        formMsg = ""; // This means SUCCESS. Let the JSP page decide how to tell this to the user.
                    } else {
                        // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                        formMsg = numRows + " records were updated when only 1 was expected.";
                    }
                    System.out.println("Number of records affected: " + numRows);
                }
            } // Db Connection is good - double check, JSP page should not send us a bad one... 
        } // customerId is not null and not empty string.
        errorMsgs.errorMsg = formMsg;
        return errorMsgs;
    } // constructor method

    private static StringData validate(StringData inputData) {

        StringData errorMsgs = new StringData();

        // Validation
        errorMsgs.PRODUCT_NAME = ValidationUtils.stringValidationMsg(inputData.PRODUCT_NAME, 45, true);
        errorMsgs.PRICE = ValidationUtils.decimalValidationMsg(inputData.PRICE, false);
        errorMsgs.RATING = ValidationUtils.integerValidationMsg(inputData.RATING, false);
        
       /* if (parseInt(inputData.RATING) <= 5 && parseInt(inputData.RATING) >= 0) {
            inputData.RATING = ValidationUtils.integerValidationMsg(inputData.RATING, false);
        } else {
            errorMsgs.RATING = "Please enter a integer between 0 and 5.";
        }*/
        return errorMsgs;
    }
    
    
    public static String deleteById(String id, DbConn dbc) {

        if (id == null) {
            return "Programmer error: for delete, product Id should not be null.";
        }
        if (id.length() == 0) {
            return "Programmer error: for delete, product Id should not be empty string.";
        }

        String formMsg = dbc.getErr(); // will be empty string if DB connection is OK.

        if (formMsg.length() == 0) { // db connection is good

            // prepare the statement 
            String sql = "DELETE FROM PRODUCTS WHERE PRODUCT_ID=?";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null 
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encoding string values into the prepared statement is pretty easy...
            pStatement.setString(1, id);

            // here the DELETE is actually executed (executeUpdate is used for any SQL other than SELECT, 
            // so that includes insert, update, and delete)
            int numRows = pStatement.executeUpdate();

            // This will return empty string if all went well, else all error messages.
            formMsg = pStatement.getErrorMsg();
            if (formMsg.length() == 0) {
                if (numRows == 1) {
                    formMsg = ""; // This means SUCCESS. Let the JSP page decide how to tell this to the user.
                } else {
                    // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                    formMsg = numRows + " records were deleted (expected to delete 1).";
                }
            }
        } // Db Connection is good - double check, JSP page should not send us a bad one... 
        return formMsg;
    }
    
    
    
} // Class