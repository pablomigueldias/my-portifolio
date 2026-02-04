from sqlalchemy.orm import Session
from slugify import slugify
from app.models.blog import Post
from app.schemas.post import PostCreate
from app.schemas.post import PostUpdate


class BlogService:
    @staticmethod
    def create_post(db: Session, post_data: PostCreate):
        generated_slug = slugify(post_data.title)

        db_post = Post(
            title=post_data.title,
            slug=generated_slug,
            content=post_data.content,
            excerpt=post_data.excerpt,
            category=post_data.category,
            author=post_data.author,
            read_time=post_data.read_time,
            image_url=post_data.image_url,
            published=post_data.published
        )

        db.add(db_post)
        db.commit()
        db.refresh(db_post)
        return db_post

    @staticmethod
    def get_all_posts(db: Session, skip: int = 0, limit: int = 10):
        return db.query(Post).order_by(Post.create_at.desc()).offset(skip).limit(limit).all()

    @staticmethod
    def get_post_by_slug(db: Session, slug: str):
        return db.query(Post).filter(Post.slug == slug).first()

    @staticmethod
    def update_post(db: Session, slug: str, post_data: "PostUpdate"):
        db_post = db.query(Post).filter(Post.slug == slug).first()

        if not db_post:
            return None

        update_data = post_data.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_post, key, value)

        db.commit()
        db.refresh(db_post)
        return db_post
