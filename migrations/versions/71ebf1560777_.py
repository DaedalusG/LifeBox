"""empty message

Revision ID: 71ebf1560777
Revises: f77e57351aa2
Create Date: 2020-09-28 01:17:55.674735

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '71ebf1560777'
down_revision = 'f77e57351aa2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('grids', sa.Column('grid_json', sa.JSON(), nullable=False))
    op.drop_column('grids', 'grid')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('grids', sa.Column('grid', postgresql.JSON(astext_type=sa.Text()), autoincrement=False, nullable=False))
    op.drop_column('grids', 'grid_json')
    # ### end Alembic commands ###
