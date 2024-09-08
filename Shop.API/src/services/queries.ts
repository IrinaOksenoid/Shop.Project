export const COMMENT_DUPLICATE_QUERY = `
        SELECT * FROM comments c
        WHERE LOWER(c.email) = ?
        AND LOWER(c.name) = ?
        AND LOWER(c.body) = ?
        AND c.product_id = ?
    `;

export const INSERT_COMMENT_QUERY = `
        INSERT INTO comments
    (comment_id, email, name, body, product_id)
VALUES
    (?, ?, ?, ?, ?)
   `;

export const INSERT_PRODUCT_QUERY = `
    INSERT INTO products (product_id, title, description, price)
    VALUES (?, ?, ?, ?)
`;

export const INSERT_IMAGES_QUERY = `
    INSERT INTO images (image_id, url, product_id, main)
    VALUES ?
`;

export const DELETE_PRODUCT_QUERY = `
    DELETE FROM products WHERE product_id = ?
`;

export const DELETE_IMAGES_QUERY = `
  DELETE FROM images 
  WHERE image_id IN ?;
`;

export const REPLACE_PRODUCT_THUMBNAIL = `
  UPDATE images
  SET main = CASE
    WHEN image_id = ? THEN 0
    WHEN image_id = ? THEN 1
    ELSE main
END
WHERE image_id IN (?, ?);
`

export const UPDATE_PRODUCT_FIELDS = `
    UPDATE products 
    SET title = ?, description = ?, price = ? 
    WHERE product_id = ?
`
export const GET_RELATED_PRODUCTS_QUERY = `
    SELECT p.product_id AS related_product_id, 
       p.title AS related_product_title, 
       p.description AS related_product_description, 
       p.price AS related_product_price
FROM related_products rp
JOIN products p ON rp.related_product_id = p.product_id
WHERE rp.product_id = ?

`;

export const INSERT_RELATED_PRODUCT_QUERY = `
    INSERT INTO related_products (product_id, related_product_id) VALUES (?, ?)
`;

export const DELETE_RELATED_PRODUCT_QUERY = `
DELETE FROM related_products 
WHERE product_id = ? AND related_product_id = ?;
  `;

  export const GET_OTHER_PRODUCTS_QUERY = `
  SELECT * FROM products p 
WHERE p.product_id != ? 
AND p.product_id NOT IN (SELECT related_product_id FROM related_products WHERE product_id = ?);

`;