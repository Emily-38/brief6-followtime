class Publications {
    constructor(
        title,
        description,
        image,
        user_id,
        likes,
        createdAt,
        
    ) {
        this.title = title
        this.description = description
        this.image = image
        this.user_id = user_id
        this.likes=[likes]
        this.createdAt = createdAt
        
    }
}
module.exports = { Publications }
