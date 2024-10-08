<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Task extends Model
{
  use HasFactory;
  protected $connection = "mongodb";
  protected $collection = 'tasks';

  protected $fillable = [
    'taskName',
    'dueDate',
    'assign'
  ];

  protected $hidden = [
    'updated_at',
    'created_at',
  ];
}
