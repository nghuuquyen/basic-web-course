#!/bin/bash

pip install mkdocs-material

mkdir -p docs
cp README.md docs/
cp schedule.md docs/
cp final-project-brief.md docs/
cp -r modules docs/
cp -r labs docs/
cp -r exercises docs/
cp -r deep-dives docs/

mkdocs serve