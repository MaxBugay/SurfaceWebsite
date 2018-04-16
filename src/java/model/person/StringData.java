package model.person;

/* The purpose of this class is just to "bundle together" all the 
 * character data that the user might type in when they want to 
 * add a new Customer or edit an existing customer.  This String
 * data is "pre-validated" data, meaning they might have typed 
 * in a character string where a number was expected.
 * 
 * There are no getter or setter methods since we are not trying to
 * protect this data in any way.  We want to let the JSP page have
 * free access to put data in or take it out. */
public class StringData {

    public String CUSTOMER_ID = "";
    public String CUSTOMER_EMAIL = "";
    public String CUSTOMER_PASSWORD = "";
    public String CUSTOMER_NICKNAME = "";
    public String CUSTOMER_ROLE = "";

    public String errorMsg = "";

    // default constructor leaves all data members with empty string.
    public StringData() {

    }

    public int getCharacterCount() {
        String s = this.CUSTOMER_ID + this.CUSTOMER_EMAIL + this.CUSTOMER_NICKNAME + this.CUSTOMER_ROLE;
        return s.length();
    }

    public String toString() {
        return "Id:" + this.CUSTOMER_ID
                + ", Email:" + this.CUSTOMER_EMAIL
                + ", Nickname:" + this.CUSTOMER_NICKNAME
                + ", Role:" + this.CUSTOMER_ROLE;
    }
}
