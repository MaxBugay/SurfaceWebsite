package model.products;

public class StringData {

    public String PRODUCT_ID = "";
    public String PRODUCT_NAME = "";
    public String IMAGE_URL = "";
    public String PRODUCT_URL = "";
    public String PRICE = "";
    public String RATING = "";
    public String errorMsg = "";

    public StringData() {

    }

    public int getCharacterCount() {
        String s = this.PRODUCT_ID + this.PRODUCT_NAME + this.PRICE + this.RATING;
        return s.length();
    }

    public String toString() {
        return "PRODUCT_ID:" + this.PRODUCT_ID
                + ", name:" + this.PRODUCT_NAME
                + ", price:" + this.PRICE
                + ", rating:" + this.RATING;
    }
}